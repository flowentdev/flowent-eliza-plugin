import {
    elizaLogger,
    type Action,
    type ActionExample,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    type State,
} from "@elizaos/core";
import { validateAsteraiConfig } from "../environment";
import {getInitAsteraiClient} from "../index.ts";

export const queryAction = {
    name: "QUERY_ASTERAI_AGENT",
    similes: [
        "MESSAGE_ASTERAI_AGENT",
        "TALK_TO_ASTERAI_AGENT",
        "SEND_MESSAGE_TO_ASTERAI_AGENT",
        "COMMUNICATE_WITH_ASTERAI_AGENT",
    ],
    description:
        "Call this action to send a message to the asterai agent which " +
        "has access to external plugins and functionality to answer " +
        "the user you are assisting, to help perform a workflow task, etc.",
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        const config = await validateAsteraiConfig(runtime);
        getInitAsteraiClient(
          config.ASTERAI_AGENT_ID,
          config.ASTERAI_PUBLIC_QUERY_KEY
        );
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        _state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        const config = await validateAsteraiConfig(runtime);
        const asteraiClient = getInitAsteraiClient(
          config.ASTERAI_AGENT_ID,
          config.ASTERAI_PUBLIC_QUERY_KEY
        );
        elizaLogger.debug("called QUERY_ASTERAI_AGENT action with message:", message.content);
        const response = await asteraiClient.query({
            query: message.content.text
        });
        const textResponse = await response.text();
        callback({
            text: textResponse
        });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "How's the weather in LA?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Let me check that for you, just a moment.",
                    action: "QUERY_ASTERAI_AGENT",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;
