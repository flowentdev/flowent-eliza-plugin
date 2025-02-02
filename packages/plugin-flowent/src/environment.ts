import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const flowentEnvSchema = z.object({
    FLOWENT_API_KEY: z.string().min(1, "Flowent API key required"),
});

export type flowentConfig = z.infer<typeof flowentEnvSchema>;

export async function validateFlowentConfig(
    runtime: IAgentRuntime
): Promise<flowentConfig> {
    try {
        const config = {
            FLOWENT_API_KEY: runtime.getSetting("FLOWENT_API_KEY"),
        };
        console.log('config: ', config)
        return flowentEnvSchema.parse(config);
    } catch (error) {
        console.log("error::::", error)
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Flowent API configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}