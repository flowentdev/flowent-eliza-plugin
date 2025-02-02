export const spotTradeTemplate = `Look at your LAST RESPONSE in the conversation where you confirmed a trade request.
Based on ONLY that last message, extract the trading details:

For Hyperliquid spot trading:
- Market orders (executes immediately at best available price):
  "buy 1 HYPE" -> { "coin": "HYPE", "is_buy": true, "sz": 1 }
  "sell 2 HYPE" -> { "coin": "HYPE", "is_buy": false, "sz": 2 }
  "market buy 1 HYPE" -> { "coin": "HYPE", "is_buy": true, "sz": 1 }
  "market sell 2 HYPE" -> { "coin": "HYPE", "is_buy": false, "sz": 2 }

- Limit orders (waits for specified price):
  "buy 1 HYPE at 20 USDC" -> { "coin": "HYPE", "is_buy": true, "sz": 1, "limit_px": 20 }
  "sell 0.5 HYPE at 21 USDC" -> { "coin": "HYPE", "is_buy": false, "sz": 0.5, "limit_px": 21 }
  "limit buy 1 HYPE at 20 USDC" -> { "coin": "HYPE", "is_buy": true, "sz": 1, "limit_px": 20 }
  "limit sell 0.5 HYPE at 21 USDC" -> { "coin": "HYPE", "is_buy": false, "sz": 0.5, "limit_px": 21 }

\`\`\`json
{
    "coin": "<coin symbol>",
    "is_buy": "<true for buy, false for sell>",
    "sz": "<quantity to trade>",
    "limit_px": "<price in USDC if limit order, null if market order>"
}
\`\`\`

Note:
- Just use the coin symbol (HYPE, ETH, etc.)
- sz is the size/quantity to trade (exactly as specified in the message)
- limit_px is optional:
  - If specified (with "at X USDC"), order will be placed at that exact price
  - If not specified, order will be placed at current market price
- Words like "market" or "limit" at the start are optional but help clarify intent

Recent conversation:
{{recentMessages}}`;

export const priceCheckTemplate = `Look at your LAST RESPONSE in the conversation where you confirmed which token price to check.
Based on ONLY that last message, extract the token symbol.

For example:
- "I'll check PIP price for you" -> { "symbol": "PIP" }
- "Let me check the price of HYPE" -> { "symbol": "HYPE" }
- "I'll get the current ETH price" -> { "symbol": "ETH" }

\`\`\`json
{
    "symbol": "<token symbol from your last message>"
}
\`\`\`

Note:
- Just return the token symbol (PIP, HYPE, ETH, etc.)
- Remove any suffixes like "-SPOT" or "USDC"
- If multiple tokens are mentioned, use the last one

Recent conversation:
{{recentMessages}}`;
