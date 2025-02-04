# Flowent Eliza Plugin 🌐⚡

[![Eliza Compatible](https://img.shields.io/badge/ElizaOS-Plugin%20Ready-7C3AED)](https://elizaos.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Flowent X](https://img.shields.io/badge/Flowent-%40flowentdev-1DA1F2)](https://x.com/flowentdev)
[![Flowent Docs](https://img.shields.io/badge/Docs-GitBook-FF9B00)](https://docs.flowent.dev)

Unified Data Access Layer for AI Agents - Solve Data Fragmentation with One Integration

---

## Overview 🌍

Flowent is a decentralized data network that solves AI data fragmentation by providing unified access to 25+ blockchain, market, and social data sources. Powered by **Deepseek R1** architecture, Flowent enables real-time data fusion at scale while reducing API costs by up to 70%.

### **Key Capabilities**

- **Multi-Source Query**: Effortlessly aggregate data from multiple trusted sources, such as Dexscreener, Etherscan, X, Dune, Messari, and more—all in a single API call. This ensures comprehensive coverage across on-chain and off-chain activity, giving you a 360-degree view of the crypto landscape.

- **AI-Powered Summarization**: Convert complex blockchain data into clear, concise, and human-readable insights. Our AI-driven approach extracts key takeaways, identifies trends, and presents actionable intelligence, reducing the need for manual analysis.

- **Structured Data Support**: Receive well-organized, structured outputs that are easy to parse, integrate, and analyze. Whether you need market trends, liquidity movements, or social sentiment, our structured format ensures seamless compatibility with your existing systems.

- **Real-Time & Cached Modes**: Strike the perfect balance between speed and freshness. Our system utilizes **embeddings for similarity matching**, allowing it to intelligently assess whether a new query closely resembles previously fetched data. By dynamically optimizing between real-time updates and cached responses, we maximize performance without compromising accuracy.Our system leverages embeddings to intelligently determine whether to fetch the latest data or use cached results, ensuring optimal performance without sacrificing accuracy.

- **Contextual Awareness**: Enhance decision-making with personalized insights. Our platform dynamically routes queries based on user preferences and historical interactions, delivering highly relevant and contextualized data tailored to your needs.

- **Enterprise-Grade Intelligence**: Unlock exclusive access to high-value datasets from leading analytics platforms such as Kaito, Nansen, and Messari. These premium sources provide deeper insights into institutional flows, market behavior, and emerging trends, giving you a competitive edge in the rapidly evolving crypto space.


With these capabilities, you can access, interpret, and act on blockchain data faster and more effectively than ever before.

---

## Installation ⚙️

```bash
npm i plugin-flowents
```

---
## Configuration 🔑

1. **Get API Key**:
   - Stake $FLWT tokens at [flowent.dev](https://flowent.dev)
   - Retrieve your `FLOWENT_API_KEY` from dashboard

2. **.env File**:
   ```env
   FLOWENT_API_KEY=flw_xxxxxxxxxxxxxxxx
   ```

3. **Eliza Setup**:
   ```typescript
   import { flowentPlugin } from '@flowent/eliza-plugin';
   
   runtime.registerPlugin(flowentPlugin);
   ```

---

## Actions ⚡

### `getInsightFlow`

**User Prompt Examples**:
- "Summarize Bitcoin’s current market conditions, highlighting trading activity, sentiment analysis, key inflows/outflows, and derivative market trends."
- "Been seeing a lot of Solana memecoins lately, what's happening with Solana ecosystem?"
- "How's Ethereum doing today?"

---
## Response Examples 📤

```json
{
  "insight": "Bitcoin stands strong at $101,963, reflecting dynamic market activity in a period of both challenges and opportunities. Despite a notable GBTC outflow of $231.7 million last week—which suggests some short-term selling pressure from the Grayscale Bitcoin Trust—the market remains buoyed by robust institutional inflows, recorded at $420 million weekly. BTC dominance is holding at 45.0%, while the funding rate of 0.02 indicates a stable perpetual futures market. In addition, the stablecoin volume has increased to $5.2 billion, ensuring ample liquidity. Social sentiment remains largely positive with 78% positive feedback, and the trending topics now include 'GBTC outflows' and 'institutional activity,' underlining the dual narrative of caution and optimism among market participants. Futures data further reinforce these dynamics, showing an open interest of $28.5 billion alongside liquidations of $42 million, collectively reflecting the ongoing trading volatility.",
  "structured": {
    "btcPrice": 101963,
    "btcDominance": 45.0,
    "btcFundingRate": 0.02,
    "stablecoinVolume": 5200000000,
    "btcSocialSentiment": {
      "positive": 78,
      "negative": 12,
      "neutral": 10,
      "trendingTopics": ["GBTC outflows", "institutional activity"]
    },
    "institutionalFlows": {
      "weeklyInflows": 420000000,
      "gbtcOutflow": 231700000,
      "topInstitution": "Grayscale"
    },
    "futuresData": {
      "openInterest": 28500000000,
      "liquidations": 42000000
    }
  },
  "metadata": {
    "sources": ["binance", "coinglass", "nansen", "x", "thegraph"],
    "creditsUsed": 783,
    "responseTime": 1.2
  }
}
```

```json
{
  "insight": "Solana continues to demonstrate strong meme targeted market activity, with SOL standing strong at $209.4 above $200 support and a total market capitalization of approximately $102.87 billion. Over the past 24 hours, trading volume has reached $5.02 billion, reflecting active investor engagement. On the social front, sentiment is 62% positive, with trending topics like '$seek' and 'AI agent', indicating growing interest in AI-related developments within the Solana ecosystem. Pump.fun, the popular token launchpad, remains highly active, facilitating 57,376 new token launches today, 492,674 in the past week, and nearly 2.87 million this month. Additionally, new wallet addresses interacting with Pump.fun have surged, with 96,235 new users today, 772,846 this week, and a staggering 2.58 million over the past month, highlighting sustained retail interest and adoption.",
  "structured": {
    "solPrice": 209.4,
    "solMarketCap": 102872432942.05,
    "solVolume24h": 5015466417.88,
    "solSocialSentiment": {
      "positive": 62,
      "negative": 18,
      "neutral": 20,
      "trendingTopics": ["$seek", "ai agent"]
    },
    "pumpfunTokenLaunch": {
      "day": 57376,
      "week": 492674,
      "month": 2874592
    },
    "pumpfunNewAddress": {
      "day": 96235,
      "week": 772846,
      "month": 2587065
    }
  },
  "metadata": {
    "sources": ["solscan", "coingecko", "x", "dune", "dexscreener"],
    "creditsUsed": 519,
    "responseTime": 3.9
  }
}
```

```json
{
  "insight": "Ethereum is currently trading at approximately $3126 as the market faces a correction, signaling cautious sentiment among investors. Despite the broader market volatility, network efficiency remains solid with gas fees ranging between 3.62 and 4.37 gwei, ensuring low transaction costs. At the same time, Bitcoin’s strong position is evident with a high dominance of around 58.2%, underscoring its appeal relative to altcoins during this period of market correction.",
  "structured": {
    "ethPrice": 3126,
    "gasPriceGwei": {
      "min": 3.42,
      "avg": 3.66,
      "max": 4.37
    },
    "marketSentiment": "bearish",
    "btcDominance": 58.2
  },
  "metadata": {
    "sources": ["coingecko", "etherscan", "coinmarketcap"],
    "creditsUsed": 286,
    "responseTime": 0.7
  }
}

```
---

## Error Handling ⚠️

**Common Errors**:

| Code | Message                        | Retryable |
| ---- | ------------------------------ | --------- |
| 429  | Rate limit exceeded            | Yes       |
| 403  | Insufficient $FLWT for credits | No        |
| 502  | Upstream source timeout        | Yes       |

**Handling Errors**:
```typescript
try {
  const response = await flowentPlugin.getInsightFlow(...);
} catch (error) {
  if (error.code === 'FLW_429') {
    // Implement retry logic with backoff
  }
  console.error(`Flowent Error: ${error.message}`);
}
```

---

## Additional Info ℹ️

**API Key Requirements**:
- $FLWT token for credit deposit. 1 $FLWT = 100 credits.
- [User Dashboard →](https://flowent.dev/dashboard)

**Support**:
- [GitBook Documentation](https://docs.flowent.dev)
