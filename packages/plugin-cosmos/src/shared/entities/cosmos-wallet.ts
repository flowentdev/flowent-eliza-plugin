import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { cosmos } from "interchain";
import type { ICosmosWallet } from "../interfaces";

type RPCQueryClient = Awaited<
    ReturnType<typeof cosmos.ClientFactory.createRPCQueryClient>
>;

export class CosmosWallet implements ICosmosWallet {
    public rpcQueryClient: RPCQueryClient;
    public directSecp256k1HdWallet: DirectSecp256k1HdWallet;

    private constructor(
        directSecp256k1HdWallet: DirectSecp256k1HdWallet,
        rpcQueryClient: RPCQueryClient
    ) {
        this.directSecp256k1HdWallet = directSecp256k1HdWallet;
        this.rpcQueryClient = rpcQueryClient;
    }

    public static async create(
        mnemonic: string,
        chainPrefix: string,
        rpcEndpoint: string
    ) {
        const directSecp256k1HdWallet =
            await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
                prefix: chainPrefix,
            });

        const rpcQueryClient = await cosmos.ClientFactory.createRPCQueryClient({
            rpcEndpoint,
        });

        return new CosmosWallet(directSecp256k1HdWallet, rpcQueryClient);
    }

    public async getWalletAddress() {
        const [account] = await this.directSecp256k1HdWallet.getAccounts();

        return account.address;
    }

    public async getWalletBalances() {
        const walletAddress = await this.getWalletAddress();

        const allBalances =
            await this.rpcQueryClient.cosmos.bank.v1beta1.allBalances({
                address: walletAddress,
            });

        return allBalances.balances;
    }
}
