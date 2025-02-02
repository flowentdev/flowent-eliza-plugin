export interface TokenSecurityData {
    ownerBalance: string;
    creatorBalance: string;
    ownerPercentage: number;
    creatorPercentage: number;
    top10HolderBalance: string;
    top10HolderPercent: number;
}

export interface TokenTradeData {
    price: number;
    priceChange24h: number;
    volume24h: number;
    volume24hUsd: string;
    uniqueWallets24h: number;
    uniqueWallets24hChange: number;
}

export interface DexScreenerPair {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    baseToken: {
        address: string;
        name: string;
        symbol: string;
    };
    quoteToken: {
        address: string;
        name: string;
        symbol: string;
    };
    priceUsd: string;
    priceChange: {
        m5: number;
        h1: number;
        h24: number;
    };
    liquidity: {
        usd: number;
        base: number;
        quote: number;
    };
    volume: {
        h24: number;
    };
    txns: {
        h24: {
            buys: number;
            sells: number;
        };
    };
    fdv: number;
    marketCap: number;
}

export interface ProcessedTokenData {
    security: TokenSecurityData;
    tradeData: TokenTradeData;
    dexScreenerData: {
        pairs: DexScreenerPair[];
    };
    holderDistributionTrend: string;
    highValueHolders: Array<{
        holderAddress: string;
        balanceUsd: string;
    }>;
    recentTrades: boolean;
    highSupplyHoldersCount: number;
    tokenCodex?: {
        isScam: boolean;
    };
}
