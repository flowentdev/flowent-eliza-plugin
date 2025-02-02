export const getTrendingTemplate = `
Extract the following parameters for trending data:
- **include_nfts** (boolean): Whether to include NFTs in the response (default: true)
- **include_categories** (boolean): Whether to include categories in the response (default: true)

Provide the values in the following JSON format:

\`\`\`json
{
    "include_nfts": true,
    "include_categories": true
}
\`\`\`

Example request: "What's trending in crypto?"
Example response:
\`\`\`json
{
    "include_nfts": true,
    "include_categories": true
}
\`\`\`

Example request: "Show me trending coins only"
Example response:
\`\`\`json
{
    "include_nfts": false,
    "include_categories": false
}
\`\`\`

Here are the recent user messages for context:
{{recentMessages}}

Based on the conversation above, if the request is for trending market data, extract the appropriate parameters and respond with a JSON object. If the request is not related to trending data, respond with null.`;