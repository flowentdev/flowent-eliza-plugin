import {
  elizaLogger,
  Action,
  ActionExample,
  HandlerCallback,
  IAgentRuntime,
  Memory,
  State,
} from "@elizaos/core";
import { FlowentService } from '../services';
import { validateFlowentConfig } from "../environment";
import { FlowentResponse } from "../types";
import { getInsightFlowExamples } from "../examples";

export const getInsightFlowAction: Action = {
  name: "FLOWENT_GET_INSIGHT_FLOW",
  similes: [
      "FLOWENT",
      "DATA FUSION",
      "UNIFIED DATA",
      "AGGREGATED INSIGHTS",
      "CROSS-SOURCE ANALYSIS",
      "GET INSIGHTS"
  ],
  description: "Retrieve unified data insights from multiple sources through Flowent's AI-powered data fusion",
  validate: async (runtime: IAgentRuntime, message: Memory) => {
      await validateFlowentConfig(runtime);
      return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
) => {
    try {
        const config = await validateFlowentConfig(runtime);
        
        const userQuery = message.content?.text || "";
        if (!userQuery) {
            throw new Error("No query provided in message content");
        }

        // Call the service with the API key and query
        const response = await FlowentService.unifiedQuery(config.FLOWENT_API_KEY, userQuery);

        elizaLogger.success(
            `Successfully fetched data from ${response.metadata.sources.length} sources`
        );

        if (callback) {
            callback({
                text: `Flowent Data Fusion Result:\n${response.insight}`,
                content: {
                    structured: response.structured,
                    metadata: response.metadata
                }
            });
        }

        return true;
    } catch (error: any) {
        elizaLogger.error("Flowent plugin handler error:", error);
        
        if (callback) {
            callback({
                text: `Failed to retrieve unified insight: ${error.message}`,
                content: { 
                    error: error.message,
                    retryable: error.retryable || false
                }
            });
        }
        
        return false;
    }
},
  examples: getInsightFlowExamples as ActionExample[][]
} as Action;