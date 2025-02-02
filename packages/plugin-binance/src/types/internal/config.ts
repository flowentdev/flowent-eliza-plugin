/**
 * Binance service configuration
 */
export interface BinanceConfig {
    apiKey?: string;
    secretKey?: string;
    baseURL?: string;
    timeout?: number;
}

/**
 * Service options that can be passed to any service method
 */
export interface ServiceOptions {
    timeout?: number;
    recvWindow?: number;
}

/**
 * Price check request parameters
 */
export interface PriceCheckRequest {
    symbol: string;
    quoteCurrency: string;
}

/**
 * Price response data
 */
export interface PriceResponse {
    symbol: string;
    price: string;
    timestamp: number;
}

/**
 * Spot trade request parameters
 */
export interface SpotTradeRequest {
    symbol: string;
    side: "BUY" | "SELL";
    type: "MARKET" | "LIMIT";
    quantity: number;
    price?: number;
    timeInForce?: "GTC" | "IOC" | "FOK";
}

/**
 * Trade response data
 */
export interface TradeResponse {
    symbol: string;
    orderId: number;
    status: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    price: string;
    type: string;
    side: string;
}

/**
 * Balance check request parameters
 */
export interface BalanceCheckRequest {
    asset?: string;
}

/**
 * Balance response data
 */
export interface BalanceResponse {
    balances: Array<{
        asset: string;
        free: string;
        locked: string;
    }>;
    timestamp: number;
}
