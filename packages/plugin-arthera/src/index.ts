export * from "./actions/transfer";
export * from "./providers/wallet";
export * from "./types";

import type { Plugin } from "@elizaos/core";
import { transferAction } from "./actions/transfer";
import { artheraWalletProvider } from "./providers/wallet";

export const artheraPlugin: Plugin = {
    name: "arthera",
    description: "Arthera blockchain integration plugin",
    providers: [artheraWalletProvider],
    evaluators: [],
    services: [],
    actions: [transferAction],
};

export default artheraPlugin;
