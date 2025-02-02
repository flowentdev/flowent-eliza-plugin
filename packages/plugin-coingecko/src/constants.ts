export const API_URLS = {
    FREE: 'https://api.coingecko.com/api/v3',
    PRO: 'https://pro-api.coingecko.com/api/v3'
} as const;

// We'll determine which URL to use based on API key validation/usage
export const DEFAULT_BASE_URL = API_URLS.FREE;