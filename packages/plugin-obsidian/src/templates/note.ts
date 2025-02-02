export const noteTemplate = (userRequest: string) => `
Respond with a JSON block containing ONLY the extracted values. Use null for any values that cannot be determined.

Ensure that:
1. The path is properly formatted with correct folder structure and ends with .md
2. The operation matches one of the supported actions (Default: READ)
3. Content is provided when required for create/update operations
4. Path uses forward slashes (/) as separators
5. The note path follows Obsidian's naming conventions
6. Make sure to remove \`\`\`json and \`\`\` from the response

Provide the details in the following JSON format:

\`\`\`json
{
    "path": "<folder>/<subfolder>/<note_name>.md",
    "operation": "<READ|CREATE|UPDATE>",
    "content": "<note_content_if_writing>",
    "metadata": {
        "tags": ["tag1", "tag2"],
        "aliases": ["alias1", "alias2"]
    }
}
\`\`\`

Here are the recent user message for context:
${userRequest}

Respond ONLY with a JSON block containing ONLY the extracted values.`;

