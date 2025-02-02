export const getTopGainersLosersTemplate = `
Extract the following parameters for top gainers and losers data:
- **vs_currency** (string): The target currency to display prices in (e.g., "usd", "eur") - defaults to "usd"
- **duration** (string): Time range for price changes - one of "24h", "7d", "14d", "30d", "60d", "1y" - defaults to "24h"
- **top_coins** (string): Filter by market cap ranking (e.g., "100", "1000") - defaults to "1000"

Provide the values in the following JSON format:

\`\`\`json
{
    "vs_currency": "usd",
    "duration": "24h",
    "top_coins": "1000"
}
\`\`\`

Example request: "Show me the biggest gainers and losers today"
Example response:
\`\`\`json
{
    "vs_currency": "usd",
    "duration": "24h",
    "top_coins": "1000"
}
\`\`\`

Example request: "What are the top movers in EUR for the past week?"
Example response:
\`\`\`json
{
    "vs_currency": "eur",
    "duration": "7d",
    "top_coins": "300"
}
\`\`\`

Example request: "Show me monthly performance of top 100 coins"
Example response:
\`\`\`json
{
    "vs_currency": "usd",
    "duration": "30d",
    "top_coins": "100"
}
\`\`\`

Here are the recent user messages for context:
{{recentMessages}}

Based on the conversation above, if the request is for top gainers and losers data, extract the appropriate parameters and respond with a JSON object. If the request is not related to top movers data, respond with null.`;