export * from "./token";

export type MarketData = {
  priceChange24h: number;
  volume24h: number;
  liquidity: {
    usd: number;
  };
};

export type Position = {
  token: string;
  tokenAddress: string;
  entryPrice: number;
  amount: number;
  timestamp: number;
  sold?: boolean;
  exitPrice?: number;
  exitTimestamp?: number;
  initialMetrics: {
    trustScore: number;
    volume24h: number;
    liquidity: { usd: number };
    riskLevel: "LOW" | "MEDIUM" | "HIGH";
  };
  highestPrice?: number;
  partialTakeProfit?: boolean;
};

export type TokenAnalysis = {
  security: {
    ownerBalance: string;
    creatorBalance: string;
    ownerPercentage: number;
    top10HolderPercent: number;
  };
  trading: {
    price: number;
    priceChange24h: number;
    volume24h: number;
    uniqueWallets24h: number;
    walletChanges: {
      unique_wallet_30m_change_percent: number;
      unique_wallet_1h_change_percent: number;
      unique_wallet_24h_change_percent: number;
    };
  };
  market: {
    liquidity: number;
    marketCap: number;
    fdv: number;
  };
};

// Add interface for 0x quote response
export interface ZeroExQuote {
  price: string;
  guaranteedPrice: string;
  estimatedPriceImpact: string;
  to: string;
  data: string;
  value: string;
  gas: string;
  estimatedGas: string;
  gasPrice: string;
  protocolFee: string;
  minimumProtocolFee: string;
  buyAmount: string;
  sellAmount: string;
  sources: Array<{
    name: string;
    proportion: string;
  }>;
  buyTokenAddress: string;
  sellTokenAddress: string;
  allowanceTarget: string;
  gasless?: {
    gasEstimate: string;
    approvalGasEstimate: string;
    feeToken: string;
    feeAmount: string;
    feeRecipient: string;
    validTo: number;
    signature: string;
  };
  transaction?: {
    data: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
  };
  permit2?: {
    eip712?: any;
    signature?: string;
  };
}

// Add new interface for 0x price response
export interface ZeroExPriceResponse extends ZeroExQuote {
  issues?: {
    allowance?: {
      spender: string;
    };
  };
}

// Add a new interface to track analyzed tokens
export interface TokenAnalysisState {
  lastAnalyzedIndex: number;
  analyzedTokens: Set<string>;
}
