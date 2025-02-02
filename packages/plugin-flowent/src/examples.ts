import { ActionExample } from "@elizaos/core";

export const getInsightFlowExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's the current sentiment around Ethereum?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me analyze data from multiple sources to give you a comprehensive view.",
                action: "FLOWENT_GET_INSIGHT_FLOW",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you show me the latest crypto market trends?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll gather real-time data from exchanges, social media, and blockchain analytics.",
                action: "FLOWENT_GET_INSIGHT_FLOW",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I need insights about Bitcoin's price movement and social sentiment.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch unified data from trading platforms and social networks.",
                action: "FLOWENT_GET_INSIGHT_FLOW",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me the latest DeFi protocol metrics across different chains.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll aggregate data from multiple blockchains and analytics platforms.",
                action: "FLOWENT_GET_INSIGHT_FLOW",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's happening in the NFT market right now?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me analyze data from marketplaces, social media, and blockchain activity.",
                action: "FLOWENT_GET_INSIGHT_FLOW",
            },
        }
    ]
];