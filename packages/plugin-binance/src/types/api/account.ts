/**
 * Binance API account information response
 */
export interface BinanceAccountInfo {
    makerCommission: number;
    takerCommission: number;
    buyerCommission: number;
    sellerCommission: number;
    canTrade: boolean;
    canWithdraw: boolean;
    canDeposit: boolean;
    updateTime: number;
    accountType: string;
    balances: BinanceBalance[];
    permissions: string[];
}

/**
 * Balance information for a single asset
 */
export interface BinanceBalance {
    asset: string;
    free: string; // Available balance
    locked: string; // Locked in orders
}

/**
 * Account trade list response
 */
export interface BinanceAccountTrade {
    symbol: string;
    id: number;
    orderId: number;
    orderListId: number;
    price: string;
    qty: string;
    quoteQty: string;
    commission: string;
    commissionAsset: string;
    time: number;
    isBuyer: boolean;
    isMaker: boolean;
    isBestMatch: boolean;
}

/**
 * Parameters for account trade list query
 */
export interface BinanceTradeListParams {
    symbol: string;
    orderId?: number;
    startTime?: number;
    endTime?: number;
    fromId?: number;
    limit?: number;
}

/**
 * Account status response
 */
export interface BinanceAccountStatus {
    data: string; // "Normal", "Margin", "Futures", etc.
}

/**
 * API trading status response
 */
export interface BinanceApiTradingStatus {
    data: {
        isLocked: boolean;
        plannedRecoverTime: number;
        triggerCondition: {
            gcr: number;
            ifer: number;
            ufr: number;
        };
        updateTime: number;
    };
}
