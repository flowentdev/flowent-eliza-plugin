import { z } from "zod";

// Base configuration types
export interface HyperliquidConfig {
    privateKey: string;
    testnet?: boolean;
    walletAddress?: string;
}

// Enhanced schemas with better validation
export const SpotOrderSchema = z.object({
    coin: z.string().min(1),
    is_buy: z.boolean(),
    sz: z.number().positive(),
    limit_px: z.number().positive().nullable(),
    reduce_only: z.boolean().default(false),
    order_type: z
        .object({
            limit: z.object({
                tif: z.enum(["Ioc", "Gtc"]),
            }),
        })
        .default({ limit: { tif: "Gtc" } }),
});

// Inferred types from schemas
export type SpotOrder = z.infer<typeof SpotOrderSchema>;

// Response types
export interface OrderResponse {
    coin: string;
    orderId: string;
    status: "open" | "filled" | "cancelled" | "rejected";
    size: number;
    price: number;
    is_buy: boolean;
}

// Error handling types
export class HyperliquidError extends Error {
    constructor(
        message: string,
        public code?: number,
        public details?: unknown
    ) {
        super(message);
        this.name = "HyperliquidError";
    }
}

// Constants
export const ORDER_STATUS = {
    OPEN: "open",
    FILLED: "filled",
    CANCELLED: "cancelled",
    REJECTED: "rejected",
} as const;

export const PRICE_VALIDATION = {
    MARKET_ORDER: {
        MIN_RATIO: 0.5, // -50% from mid price
        MAX_RATIO: 1.5, // +50% from mid price
    },
    LIMIT_ORDER: {
        WARNING_MIN_RATIO: 0.2, // -80% from mid price
        WARNING_MAX_RATIO: 5, // +500% from mid price
    },
    SLIPPAGE: 0.01, // 1% slippage for market orders
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS;

// Balance types
export interface BalanceResponse {
    coin: string;
    free: number;
    locked: number;
}
