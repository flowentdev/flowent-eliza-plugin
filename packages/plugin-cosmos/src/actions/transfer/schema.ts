import { z } from "zod";

export const cosmosTransferParamsSchema = z.object({
    chainName: z.string(),
    symbol: z.string(),
    amount: z.string(),
    toAddress: z.string(),
});
