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
import { FlowentQuery, FlowentResponse } from "../types";
import { getInsightFlowExamples } from "../examples";

export const getInsightFlowAction: Action = {
  name: "FLOWENT_GET_DATA_FUSION",
  similes: [
      "FLOWENT",
      "DATA FUSION",
      "UNIFIED DATA",
      "AGGREGATED INSIGHTS",
      "CROSS-SOURCE ANALYSIS"
  ],
  description: "Retrieve unified data insights from multiple sources through Flowent's AI-powered data fusion",
  validate: async (runtime: IAgentRuntime) => {
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

        // Construct the full query object
        const query: FlowentQuery = {
            prompt: userQuery,
            context: {
                userType: state.user?.type || 'general', // Extract user type from state
                preferences: state.user?.preferences || {} // Extract preferences from state
            },
            freshness: 'realtime', // Default to realtime
            maxSources: 5 // Default to 5 sources
        };

        // Call the service with the API key and query
        const response = await FlowentService.unifiedQuery(config.FLOWENT_API_KEY, query);

        elizaLogger.success(
            `Successfully fetched data from ${response.metadata.sources.length} sources`
        );

        if (callback) {
            callback({
                text: `Flowent Data Fusion Result:\n${response.summary}`,
                content: {
                    rawData: response.rawData,
                    metadata: response.metadata
                }
            });
        }

        return true;
    } catch (error: any) {
        elizaLogger.error("Flowent plugin handler error:", error);
        
        if (callback) {
            callback({
                text: `Failed to retrieve unified data: ${error.message}`,
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