// types.ts
import { z } from "zod";

// Base configuration types
export interface BinanceConfig {
    apiKey?: string;
    secretKey?: string;
    baseURL?: string;
}

// Enhanced schemas with better validation
export const PriceCheckSchema = z.object({
    symbol: z.string().min(1).toUpperCase(),
    quoteCurrency: z.string().min(1).toUpperCase().default("USDT"),
});

export const SpotTradeSchema = z.object({
    symbol: z.string().min(1).toUpperCase(),
    side: z.enum(["BUY", "SELL"]),
    type: z.enum(["MARKET", "LIMIT"]),
    quantity: z.number().positive(),
    price: z.number().positive().optional(),
    timeInForce: z.enum(["GTC", "IOC", "FOK"]).optional().default("GTC"),
});

// Inferred types from schemas
export type PriceCheckRequest = z.infer<typeof PriceCheckSchema>;
export type SpotTradeRequest = z.infer<typeof SpotTradeSchema>;

// Response types
export interface PriceResponse {
    symbol: string;
    price: string;
    timestamp: number;
}

export interface TradeResponse {
    symbol: string;
    orderId: number;
    status: "NEW" | "PARTIALLY_FILLED" | "FILLED" | "CANCELED" | "REJECTED";
    executedQty: string;
    cummulativeQuoteQty: string;
    price: string;
    type: SpotTradeRequest["type"];
    side: SpotTradeRequest["side"];
}

// Error handling types
export class BinanceError extends Error {
    constructor(
        message: string,
        public code?: number,
        public details?: unknown
    ) {
        super(message);
        this.name = "BinanceError";
    }
}

// Constants
export const TRADE_STATUS = {
    NEW: "NEW",
    PARTIALLY_FILLED: "PARTIALLY_FILLED",
    FILLED: "FILLED",
    CANCELED: "CANCELED",
    REJECTED: "REJECTED",
} as const;

export type TradeStatus = keyof typeof TRADE_STATUS;

// Balance types
export interface BalanceCheckRequest {
    asset?: string;
}

export interface AssetBalance {
    asset: string;
    free: string;
    locked: string;
}

export interface BalanceResponse {
    balances: AssetBalance[];
    timestamp: number;
}
