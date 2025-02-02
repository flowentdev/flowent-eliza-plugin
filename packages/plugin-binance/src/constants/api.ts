export const API_DEFAULTS = {
    BASE_URL: "https://api.binance.com",
    TIMEOUT: 30000, // 30 seconds
    RATE_LIMIT: {
        MAX_REQUESTS_PER_MINUTE: 1200,
        WEIGHT_PER_REQUEST: 1,
    },
};

export const API_ENDPOINTS = {
    TICKER: "/api/v3/ticker/price",
    ACCOUNT: "/api/v3/account",
    ORDER: "/api/v3/order",
    EXCHANGE_INFO: "/api/v3/exchangeInfo",
};

export const ORDER_TYPES = {
    MARKET: "MARKET",
    LIMIT: "LIMIT",
} as const;

export const ORDER_SIDES = {
    BUY: "BUY",
    SELL: "SELL",
} as const;

export const TIME_IN_FORCE = {
    GTC: "GTC", // Good Till Cancel
    IOC: "IOC", // Immediate or Cancel
    FOK: "FOK", // Fill or Kill
} as const;
