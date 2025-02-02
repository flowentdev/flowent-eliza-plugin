/**
 * Binance API response for ticker price endpoint
 */
export interface BinanceTickerResponse {
    symbol: string;
    price: string;
}

/**
 * Binance API response for 24hr ticker
 */
export interface BinanceTickerStatistics {
    symbol: string;
    priceChange: string;
    priceChangePercent: string;
    weightedAvgPrice: string;
    prevClosePrice: string;
    lastPrice: string;
    lastQty: string;
    bidPrice: string;
    bidQty: string;
    askPrice: string;
    askQty: string;
    openPrice: string;
    highPrice: string;
    lowPrice: string;
    volume: string;
    quoteVolume: string;
    openTime: number;
    closeTime: number;
    firstId: number;
    lastId: number;
    count: number;
}

/**
 * Exchange information for a symbol
 */
export interface BinanceSymbolInfo {
    symbol: string;
    status: string;
    baseAsset: string;
    baseAssetPrecision: number;
    quoteAsset: string;
    quotePrecision: number;
    quoteAssetPrecision: number;
    filters: BinanceSymbolFilter[];
}

/**
 * Symbol filter types
 */
export interface BinanceSymbolFilter {
    filterType: string;
    minPrice?: string;
    maxPrice?: string;
    tickSize?: string;
    minQty?: string;
    maxQty?: string;
    stepSize?: string;
    minNotional?: string;
    limit?: number;
    multiplierUp?: string;
    multiplierDown?: string;
    avgPriceMins?: number;
}

/**
 * Exchange information response
 */
export interface BinanceExchangeInfo {
    timezone: string;
    serverTime: number;
    rateLimits: Array<{
        rateLimitType: string;
        interval: string;
        intervalNum: number;
        limit: number;
    }>;
    symbols: BinanceSymbolInfo[];
}
