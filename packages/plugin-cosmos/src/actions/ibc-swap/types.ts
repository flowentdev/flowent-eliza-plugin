import type { z } from "zod";
import type { IBCSwapParamsSchema } from "./schema.ts";

export type IBCSwapActionParams = z.infer<typeof IBCSwapParamsSchema>;
