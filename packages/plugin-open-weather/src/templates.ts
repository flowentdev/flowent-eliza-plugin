export const getCurrentWeatherTemplate = `Respond with a JSON object containing location information for weather data.
Extract the location from the most recent message. If no specific location is provided, respond with an error.

The response must include:
- city: The city name
- country: The country code (ISO 2-letter code)

Example response:
\`\`\`json
{
    "city": "London",
    "country": "GB"
}
\`\`\`
{{recentMessages}}
Extract the location from the most recent message.
Respond with a JSON markdown block containing both city and country.`;
