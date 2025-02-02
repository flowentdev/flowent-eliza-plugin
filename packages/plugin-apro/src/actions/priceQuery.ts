import type { Action, HandlerCallback, IAgentRuntime, Memory, State } from "@elizaos/core";
import { composeContext, elizaLogger, generateObject, ModelClass } from "@elizaos/core";
import { priceQueryTemplate } from "../templates";
import type { PriceData, PriceQueryParams } from "../types";
import { isPriceQueryParams, PriceQueryParamsSchema } from "../types";

async function fetchPriceData(pair: string) {
    const response = await fetch(`https://live-api.apro.com/api/live-stream/reports?pair=${pair}`);
    const { result } = await response.json();
    return result as PriceData[];
}

export const priceQuery: Action = {
    name: "PRICE_QUERY",
    similes: [
        'PRICE_FETCH',
    ],
    description: "Call remote API to fetch price data for a given pair.",
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
        // Initialize or update state
        let currentState = state;
        if (!currentState) {
            currentState = (await runtime.composeState(message)) as State;
        } else {
            currentState = await runtime.updateRecentMessageState(currentState);
        }

        // Generate price query params
        let priceQueryParams: PriceQueryParams;
        try {
            const response = await generateObject({
                runtime,
                context: composeContext({
                    state: currentState,
                    template: priceQueryTemplate,
                }),
                modelClass: ModelClass.LARGE,
                schema: PriceQueryParamsSchema,
            });
            priceQueryParams = response.object as PriceQueryParams;
            elizaLogger.info('The price query params received:', priceQueryParams);
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
        if (!isPriceQueryParams(priceQueryParams)) {
            elizaLogger.error('Invalid price query params:', priceQueryParams);
            if (callback) {
                callback({
                    text: 'Invalid price query params. Please provide valid input.',
                });
            }
            return;
        }

        // Fetch price data
        try {
            const { pair } = priceQueryParams;
            const priceData = await fetchPriceData(pair);
            elizaLogger.info('The Price data received:', priceData);

            if (!priceData || priceData.length === 0) {
                elizaLogger.error('No price data found for pair:', pair);
                if (callback) {
                    callback({
                        text: `No price data found for pair ${pair}.`,
                    });
                }
                return;
            }

            const priceDataString = priceData.map((data) => {
                return `Feed ID: ${data.feedId}\nBid Price: ${data.bidPrice}\nMid Price: ${data.midPrice}\nAsk Price: ${data.askPrice}\nTimestamp: ${data.timestamp}`;
            }).join('\n\n');
            
            if (callback) {
                callback({
                    text: `Price data for pair ${pair}: \n${priceDataString}`,
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
                    text: "Can you fetch price data for pair BTC/USD?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "I'll fetch price data for pair BTC/USD.",
                    action: 'PRICE_QUERY',
                },
            }
        ],
    ],
}