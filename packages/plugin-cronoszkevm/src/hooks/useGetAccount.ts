import type { IAgentRuntime } from "@elizaos/core";
import type { PrivateKeyAccount } from "viem/accounts";
import { privateKeyToAccount } from "viem/accounts";

export const useGetAccount = (runtime: IAgentRuntime): PrivateKeyAccount => {
    const privateKey = runtime.getSetting("CRONOSZKEVM_PRIVATE_KEY");
    if (!privateKey) {
        throw new Error("CRONOSZKEVM_PRIVATE_KEY not set");
    }
    return privateKeyToAccount(`0x${privateKey}`);
};
