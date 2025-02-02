export const TRADE_DEFAULTS = {
    QUOTE_CURRENCY: "USDT",
    TIME_IN_FORCE: "GTC",
    ORDER_TYPE: "MARKET",
    PRICE_PRECISION: 8,
    QUANTITY_PRECISION: 8,
};

export const DISPLAY_DEFAULTS = {
    PRICE_FORMAT: {
        MIN_FRACTION_DIGITS: 2,
        MAX_FRACTION_DIGITS: 8,
        LOCALE: "en-US",
    },
};

export const VALIDATION = {
    SYMBOL: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 10,
    },
};
