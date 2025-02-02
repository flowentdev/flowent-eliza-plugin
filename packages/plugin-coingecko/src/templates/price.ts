export const getPriceTemplate = `
Extract the following parameters for cryptocurrency price data:
- **coinIds** (string | string[]): The ID(s) of the cryptocurrency/cryptocurrencies to get prices for (e.g., "bitcoin" or ["bitcoin", "ethereum"])
- **currency** (string | string[]): The currency/currencies to display prices in (e.g., "usd" or ["usd", "eur", "jpy"]) - defaults to ["usd"]
- **include_market_cap** (boolean): Whether to include market cap data - defaults to false
- **include_24hr_vol** (boolean): Whether to include 24h volume data - defaults to false
- **include_24hr_change** (boolean): Whether to include 24h price change data - defaults to false
- **include_last_updated_at** (boolean): Whether to include last update timestamp - defaults to false

Provide the values in the following JSON format:

\`\`\`json
{
    "coinIds": "bitcoin",
    "currency": ["usd"],
    "include_market_cap": false,
    "include_24hr_vol": false,
    "include_24hr_change": false,
    "include_last_updated_at": false
}
\`\`\`

Example request: "What's the current price of Bitcoin?"
Example response:
\`\`\`json
{
    "coinIds": "bitcoin",
    "currency": ["usd"],
    "include_market_cap": false,
    "include_24hr_vol": false,
    "include_24hr_change": false,
    "include_last_updated_at": false
}
\`\`\`

Example request: "Show me ETH price and market cap in EUR with last update time"
Example response:
\`\`\`json
{
    "coinIds": "ethereum",
    "currency": ["eur"],
    "include_market_cap": true,
    "include_24hr_vol": false,
    "include_24hr_change": false,
    "include_last_updated_at": true
}
\`\`\`

Example request: "What's the current price of Bitcoin in USD, JPY and EUR?"
Example response:
\`\`\`json
{
    "coinIds": "bitcoin",
    "currency": ["usd", "jpy", "eur"],
    "include_market_cap": false,
    "include_24hr_vol": false,
    "include_24hr_change": false,
    "include_last_updated_at": false
}
\`\`\`

Here are the recent user messages for context:
{{recentMessages}}

Based on the conversation above, if the request is for cryptocurrency price data, extract the appropriate parameters and respond with a JSON object. If the request is not related to price data, respond with null.`;
