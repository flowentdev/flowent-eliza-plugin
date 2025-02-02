import {asteraiProvider} from "./providers/asterai.provider.ts";
import type { Plugin } from "@elizaos/core";
import { queryAction } from "./actions/query";
import { AsteraiClient } from "@asterai/client";

export * from "./environment";
export * from "./providers/asterai.provider";

let asteraiClient: AsteraiClient | null = null;

export const getInitAsteraiClient = (
  agentId: string,
  publicQueryKey: string
): AsteraiClient => {
    if (!asteraiClient) {
        asteraiClient = new AsteraiClient({
            appId: agentId,
            queryKey: publicQueryKey,
        })
    }
    return asteraiClient;
};

export const asteraiPlugin: Plugin = {
    name: "asterai",
    description: "asterai Plugin for Eliza",
    providers: [asteraiProvider],
    actions: [queryAction],
    evaluators: [],
    services: [],
};

export default asteraiPlugin;
