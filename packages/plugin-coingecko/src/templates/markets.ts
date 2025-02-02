export const getMarketsTemplate = `
Extract the following parameters for market listing:
- **vs_currency** (string): Target currency for price data (default: "usd")
- **category** (string, optional): Specific category ID from the available categories
- **per_page** (number): Number of results to return (1-250, default: 20)
- **order** (string): Sort order for results, one of:
  - market_cap_desc: Highest market cap first
  - market_cap_asc: Lowest market cap first
  - volume_desc: Highest volume first
  - volume_asc: Lowest volume first

Available Categories:
{{categories}}

Provide the values in the following JSON format:

\`\`\`json
{
    "vs_currency": "<currency>",
    "category": "<category_id>",
    "per_page": <number>,
    "order": "<sort_order>",
    "page": 1,
    "sparkline": false
}
\`\`\`

Example request: "Show me the top 10 gaming cryptocurrencies"
Example response:
\`\`\`json
{
    "vs_currency": "usd",
    "category": "gaming",
    "per_page": 10,
    "order": "market_cap_desc",
    "page": 1,
    "sparkline": false
}
\`\`\`

Example request: "What are the best performing coins by volume?"
Example response:
\`\`\`json
{
    "vs_currency": "usd",
    "per_page": 20,
    "order": "volume_desc",
    "page": 1,
    "sparkline": false
}
\`\`\`

Here are the recent user messages for context:
{{recentMessages}}

Based on the conversation above, if the request is for a market listing/ranking, extract the appropriate parameters and respond with a JSON object. If the request is for specific coins only, respond with null.`;