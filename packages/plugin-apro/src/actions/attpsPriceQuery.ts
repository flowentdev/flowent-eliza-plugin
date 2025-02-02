import type { Action, HandlerCallback, IAgentRuntime, Memory, State } from "@elizaos/core";
import { composeContext, elizaLogger, generateObject, ModelClass } from "@elizaos/core";
import { attpsPriceQueryTemplate } from "../templates";
import type { AttpsPriceQuery, AttpsPriceQueryResponse } from "../types";
import { AttpsPriceQuerySchema, isAttpsPriceQuery } from "../types";

async function fetchPriceData(sourceAgentId: string, feedId: string) {
    const response = await fetch(`https://ai-agent-test.apro.com/api/ai-agent/price-detail?sourceAgentId=${sourceAgentId}&feedId=${feedId}`);
    const { result, code, message } = await response.json();
    if (code !== 0) {
        throw new Error(message);
    }
    return result as AttpsPriceQueryResponse;
}

function cleanNumber(numStr: string) {
    return Number.parseFloat(numStr).toString();
}

export const attpsPriceQuery: Action = {
    name: "ATTPS_PRICE_QUERY",
    similes: [
        'ATTPS_PRICE_FETCH',
    ],
    description: "Call remote API to fetch price data for a given source agent id and feed id.",
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state?: State,
        _options?: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        let currentState = state;
        if (!currentState) {
            currentState = (await runtime.composeState(message)) as State;
        } else {
            currentState = await runtime.updateRecentMessageState(currentState);
        }

        // Generate price query params
        let attpsPriceQuery: AttpsPriceQuery;
        try {
            const response = await generateObject({
                runtime,
                context: composeContext({
                    state: currentState,
                    template: attpsPriceQueryTemplate,
                }),
                modelClass: ModelClass.LARGE,
                schema: AttpsPriceQuerySchema,
            });
            attpsPriceQuery = response.object as AttpsPriceQuery;
            elizaLogger.info('The price query params received:', attpsPriceQuery);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            elizaLogger.error('Failed to generate price query params:', errorMessage);
            if (callback) {
                callback({
                    text: 'Failed to generate price query params. Please provide valid input.',
                });
            }
            return;
        }

        // Validate price query params
        if (!isAttpsPriceQuery(attpsPriceQuery)) {
            elizaLogger.error('Invalid price query params:', attpsPriceQuery);
            if (callback) {
                callback({
                    text: 'Invalid price query params. Please provide valid input.',
                });
            }
            return;
        }

        // Fetch price data
        try {
            const { sourceAgentId, feedId } = attpsPriceQuery;
            const priceData = await fetchPriceData(sourceAgentId, feedId);
            elizaLogger.info('The Price data received:', priceData);

            const message = `Ask price: ${cleanNumber(priceData.askPrice)}\nBid price: ${cleanNumber(priceData.bidPrice)}\nMid price: ${cleanNumber(priceData.midPrice)}\nTimestamp: ${priceData.validTimeStamp}`;
            if (callback) {
                callback({
                    text: `Here is the price data:\n${message}`,
                });
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            elizaLogger.error('Error fetching price data:', errorMessage);
            if (callback) {
                callback({
                    text: `Error fetching price data: ${errorMessage}`,
                });
            }
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Can you fetch price data for source agent id ... and feed id ...?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "I'll fetch price data for you. Give me a moment.",
                    action: 'ATTPS_PRICE_QUERY',
                },
            }
        ],
    ],
}