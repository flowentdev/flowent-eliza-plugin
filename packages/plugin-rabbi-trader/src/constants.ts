export const SAFETY_LIMITS = {
  MINIMUM_TRADE: 0.01, // Minimum 0.01 SOL per trade
  MAX_POSITION_SIZE: 0.1, // Maximum 10% of token liquidity
  MAX_SLIPPAGE: 0.05, // Maximum 5% slippage allowed
  MIN_LIQUIDITY: 1000, // Minimum $1000 liquidity required
  MIN_VOLUME: 2000, // Minimum $2000 24h volume required
  MIN_TRUST_SCORE: 0.4, // Minimum trust score to trade
  STOP_LOSS: 0.2, // 20% stop loss trigger
  CHECK_INTERVAL: 5 * 60 * 1000, // Check every 5 minutes
  TAKE_PROFIT: 0.12, // Take profit at 12% gain
  TRAILING_STOP: 0.2, // 20% trailing stop from highest
  PARTIAL_TAKE: 0.06, // Take 50% profit at 6% gain
  REENTRY_DELAY: 60 * 60 * 1000, // Wait 1 hour before re-entering
  MAX_ACTIVE_POSITIONS: 5, // Maximum concurrent positions
  MIN_WALLET_BALANCE: 0.05, // Keep minimum 0.05 SOL in wallet
};

export const ANALYSIS_HISTORY_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const MAX_TWEETS_PER_HOUR = {
  trade: 10,
  market_search: 5,
};

export const MARKET_SEARCH_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds
