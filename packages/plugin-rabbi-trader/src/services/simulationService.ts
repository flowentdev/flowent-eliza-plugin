import { elizaLogger } from "@elizaos/core";
import { TokenProvider } from "../providers/token";
import { TrustScoreProvider } from "../providers/trustScoreProvider";

export class SimulationService {
    private trustScoreProvider: TrustScoreProvider;

    constructor() {
        this.trustScoreProvider = new TrustScoreProvider();
    }

    async simulateTrade(
        tokenAddress: string,
        amount: number
    ): Promise<{
        expectedPrice: number;
        priceImpact: number;
        recommendedAction: "EXECUTE" | "ABORT";
        reason: string;
    }> {
        try {
            const evaluation =
                await this.trustScoreProvider.evaluateToken(tokenAddress);
            const tokenProvider = new TokenProvider(tokenAddress);
            const tokenData = await tokenProvider.getProcessedTokenData();

            // Get liquidity from DexScreener data
            const liquidity =
                tokenData.dexScreenerData.pairs[0]?.liquidity?.usd || 0;
            const priceImpact = (amount / liquidity) * 100;

            let recommendedAction: "EXECUTE" | "ABORT" = "ABORT";
            let reason = "Default safety check failed";

            if (evaluation.trustScore > 0.4 && priceImpact < 1) {
                recommendedAction = "EXECUTE";
                reason = "Trade meets safety parameters";
            }

            return {
                expectedPrice: tokenData.tradeData.price,
                priceImpact,
                recommendedAction,
                reason,
            };
        } catch (error) {
            elizaLogger.error("Trade simulation failed:", error);
            throw error;
        }
    }
}
