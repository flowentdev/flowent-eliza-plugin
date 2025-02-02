export const summaryTemplate = `
Extract a focused summary of the provided Obsidian note content based on the following:
- **theme** (string): The main topic or theme to focus the summary around
- **content** (string): The full markdown content to be summarized

Ensure that:
1. The summary is relevant to the specified theme/topic
2. Key points and insights related to the theme are highlighted
3. The summary maintains proper context from the original content
4. Important quotes or examples related to the theme are preserved
5. The summary length is proportional to the content's relevance to the theme
6. Make sure to remove \`\`\`json and \`\`\` from the response

Provide the summary in the following JSON format:

\`\`\`json
{
    "theme": "<theme>",
    "summary": "<focused_summary>",
    "relevance": "<high|medium|low>",
    "key_points": [
        "<point_1>",
        "<point_2>"
    ],
    "related_quotes": [
        "<quote_1>",
        "<quote_2>"
    ]
}
\`\`\`

Here are the recent user messages and note content for context:
{{recentMessages}}

Note content to summarize:
{{responseData}}
`;

export const baseSummaryTemplate = `# Summarized so far (we are adding to this)
{{currentSummary}}

# Current note chunk we are summarizing (includes metadata)
{{currentChunk}}

Summarization objective: {{objective}}

# Instructions: Summarize the note content so far. Return the summary. Do not acknowledge this request, just summarize and continue the existing summary if there is one. Capture any important details to the objective. Only respond with the new summary text.
Your response should be extremely detailed and include any and all relevant information.`;
