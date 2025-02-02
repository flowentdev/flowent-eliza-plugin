import {
    convertDisplayUnitToBaseUnit,
    getAssetBySymbol,
} from "@chain-registry/utils";
import type { Coin } from "@cosmjs/stargate";
import { assets } from "chain-registry";
import { getPaidFeeFromReceipt } from "../../../shared/helpers/cosmos-transaction-receipt.ts";
import type {
    ICosmosActionService,
    ICosmosPluginCustomChainData,
    ICosmosTransaction,
    ICosmosWalletChains,
} from "../../../shared/interfaces.ts";
import { CosmosTransactionFeeEstimator } from "../../../shared/services/cosmos-transaction-fee-estimator.ts";
import type { CosmosTransferParams } from "../types.ts";
import { getAvailableAssets } from "../../../shared/helpers/cosmos-assets.ts";

export class CosmosTransferActionService implements ICosmosActionService {
    constructor(private cosmosWalletChains: ICosmosWalletChains) {
        this.cosmosWalletChains = cosmosWalletChains;
    }

    async execute(
        params: CosmosTransferParams,
        customChainAssets?: ICosmosPluginCustomChainData["assets"][]
    ): Promise<ICosmosTransaction> {
        const signingCosmWasmClient =
            this.cosmosWalletChains.getSigningCosmWasmClient(params.chainName);

        const senderAddress = await this.cosmosWalletChains.getWalletAddress(
            params.chainName
        );

        if (!senderAddress) {
            throw new Error(
                `Cannot get wallet address for chain ${params.chainName}`
            );
        }

        if (!params.toAddress) {
            throw new Error("No receiver address");
        }

        if (!params.symbol) {
            throw new Error("No symbol");
        }

        const availableAssets = getAvailableAssets(assets, customChainAssets);

        const coin: Coin = {
            denom: getAssetBySymbol(
                availableAssets,
                params.symbol,
                params.chainName
            ).base,
            amount: convertDisplayUnitToBaseUnit(
                availableAssets,
                params.symbol,
                params.amount,
                params.chainName
            ),
        };

        const gasFee =
            await CosmosTransactionFeeEstimator.estimateGasForCoinTransfer(
                signingCosmWasmClient,
                senderAddress,
                params.toAddress,
                [coin]
            );

        const txDeliveryResponse = await signingCosmWasmClient.sendTokens(
            senderAddress,
            params.toAddress,
            [coin],
            { gas: gasFee.toString(), amount: [{ ...coin, amount: gasFee.toString() }] }
        );

        const gasPaid = getPaidFeeFromReceipt(txDeliveryResponse);

        return {
            from: senderAddress,
            to: params.toAddress,
            gasPaid,
            txHash: txDeliveryResponse.transactionHash,
        };
    }
}
