export const traversalTemplate = (userRequest: string) => `
Respond with a JSON markdown block containing ONLY the extracted values. Use null for any values that cannot be determined.

Ensure that:
1. The path is properly formatted with correct folder structure and ends with .md
2. Depth is a reasonable number (1-5) to prevent excessive traversal
3. Content inclusion is specified when detailed analysis is needed
4. Filters are provided when specific note types or locations are targeted
5. Make sure to remove \`\`\`json and \`\`\` from the response

Provide the details in the following JSON format:

\`\`\`json
{
    "path": "<folder>/<subfolder>/<note_name>.md",
    "depth": <number>,
    "includeContent": <boolean>,
    "filters": {
        "tags": ["<tag1>", "<tag2>"],
        "folders": ["<folder1>", "<folder2>"],
        "modified": "<YYYY-MM-DD>"
    }
}
\`\`\`

Here are the recent user messages for context:
${userRequest}

Respond ONLY with a JSON markdown block containing ONLY the extracted values.`;
