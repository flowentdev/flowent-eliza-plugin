import { ERROR_CODES } from "../../constants/errors";

type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/**
 * Base error class for Binance-related errors
 */
export class BinanceError extends Error {
    public readonly code: ErrorCode | number;
    public readonly originalError?: unknown;

    constructor(
        message: string,
        code: ErrorCode | number = ERROR_CODES.INVALID_PARAMETERS,
        originalError?: unknown
    ) {
        super(message);
        this.name = "BinanceError";
        this.code = code;
        this.originalError = originalError;

        // Maintains proper stack trace for where error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BinanceError);
        }
    }
}

/**
 * Error thrown when API credentials are invalid or missing
 */
export class AuthenticationError extends BinanceError {
    constructor(message = "Invalid API credentials") {
        super(message, ERROR_CODES.INVALID_CREDENTIALS);
        this.name = "AuthenticationError";
    }
}

/**
 * Error thrown when order validation fails
 */
export class OrderValidationError extends BinanceError {
    constructor(
        message: string,
        code: ErrorCode | number = ERROR_CODES.INVALID_PARAMETERS
    ) {
        super(message, code);
        this.name = "OrderValidationError";
    }
}

/**
 * Error thrown when minimum notional value is not met
 */
export class MinNotionalError extends OrderValidationError {
    constructor(minNotional?: string) {
        super(
            `Order value is too small. ${
                minNotional ? `Minimum order value is ${minNotional} USDC.` : ""
            }`,
            ERROR_CODES.MIN_NOTIONAL_NOT_MET
        );
        this.name = "MinNotionalError";
    }
}

/**
 * Error thrown when insufficient balance
 */
export class InsufficientBalanceError extends OrderValidationError {
    constructor(asset: string) {
        super(
            `Insufficient ${asset} balance`,
            ERROR_CODES.INSUFFICIENT_BALANCE
        );
        this.name = "InsufficientBalanceError";
    }
}

/**
 * Error thrown when symbol is invalid
 */
export class InvalidSymbolError extends BinanceError {
    constructor(symbol: string) {
        super(
            `Trading pair ${symbol} is not available`,
            ERROR_CODES.INVALID_PARAMETERS
        );
        this.name = "InvalidSymbolError";
    }
}

/**
 * Error thrown when API request fails
 */
export class ApiError extends BinanceError {
    constructor(
        message: string,
        code: number,
        public readonly response?: unknown
    ) {
        super(message, code);
        this.name = "ApiError";
    }
}
