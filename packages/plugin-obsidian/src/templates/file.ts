export const fileTemplate = (userRequest: string) => `
Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined.

Ensure that:
1. The path is properly formatted with correct folder structure
2. The operation matches one of the supported actions (Default: READ)
3. Content is provided when required for write operations
4. Path uses forward slashes (/) as separators
5. Make sure to remove \`\`\`json and \`\`\` from the response

Provide the details in the following JSON format:

\`\`\`json
{
    "path": "<folder>/<subfolder>/<filename>",
    "operation": "<READ|WRITE>",
    "content": "<file_content_to_write>"
}
\`\`\`

Here are the recent user messages for context:
${userRequest}

Respond ONLY with a JSON markdown block containing only the extracted values.`;

