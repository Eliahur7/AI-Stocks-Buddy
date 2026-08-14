# 📈 AI Stocks Buddy

[![GitHub Stars](https://img.shields.io/github/stars/Eliahur7/AI-Stocks-Buddy?style=social)](https://github.com/Eliahur7/AI-Stocks-Buddy)
[![GitHub Forks](https://img.shields.io/github/forks/Eliahur7/AI-Stocks-Buddy?style=social)](https://github.com/Eliahur7/AI-Stocks-Buddy)
[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase Edge Functions](https://img.shields.io/badge/Supabase-Edge_Functions-green.svg?logo=supabase)](https://supabase.com/)
[![Gemini 1.5 Flash](https://img.shields.io/badge/AI-Gemini_1.5_Flash-orange.svg?logo=google)](https://deepmind.google/technologies/gemini/)

**AI Stocks Buddy** is a high-performance autonomous multi-agent stock market intelligence platform. Engineered with modern glassmorphism aesthetics, responsive dark-mode styling, and resilient dual-layer AI architecture, it delivers institutional-grade fundamental quality ratings, automated technical momentum analysis, and disciplined risk-gated investment consensus for any stock ticker.

---

## 🏷️ Topics & Keywords

`ai-agents` • `multi-agent-systems` • `stock-market-analysis` • `fundamental-analysis` • `technical-analysis` • `financial-engineering` • `algorithmic-trading` • `stock-screener` • `gemini-api` • `google-gemini` • `supabase` • `supabase-edge-functions` • `react` • `typescript` • `tailwind-css` • `vite` • `investment-research` • `quant-finance` • `financial-modeling`

---

## 🤖 Multi-Agent AI Architecture

AI Stocks Buddy separates analytical domains into specialized autonomous agent layers that collaborate to form a comprehensive investment thesis:

```
                          ┌───────────────────────────┐
                          │   User Search (e.g. AMD)  │
                          └─────────────┬─────────────┘
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
┌─────────────────────────┐                               ┌─────────────────────────┐
│  Fundamentals Expert 🧠 │                               │   Technical Expert ⚡  │
├─────────────────────────┤                               ├─────────────────────────┤
│ • 6-Dimension Scoring   │                               │ • RSI(14) Visual Gauge  │
│ • Valuation & Growth    │                               │ • MACD Divergence       │
│ • Profitability & Health│                               │ • 50/200-Day SMAs       │
│ • Strengths & Concerns  │                               │ • Support & Resistance  │
│ • Investor Profile Match│                               │ • Trend & Momentum      │
└────────────┬────────────┘                               └────────────┬────────────┘
             │                                                         │
             └──────────────────────────┬──────────────────────────────┘
                                        ▼
                          ┌───────────────────────────┐
                          │   Consensus Engine 🎯     │
                          ├───────────────────────────┤
                          │ • BUY / HOLD / SELL Rating│
                          │ • 60% Confidence Gate     │
                          │ • Key Catalysts & Risks   │
                          └───────────────────────────┘
```

---

## 🧠 How the Fundamentals Expert Agent Works

The **Fundamentals Expert Agent** acts as an automated fundamental equity research analyst. It digests raw financial statements, ratios, and historical growth metrics to produce a 6-pillar breakdown scored on a normalized 1–10 scale:

### 1. The 6-Dimension Evaluation Framework
1. **Valuation (Score 1–10):** Evaluates Trailing P/E (TTM), Forward P/E, PEG Ratio, Price-to-Sales (P/S), and Price-to-Book (P/B). Determines whether market pricing reflects a discount, fair value, or multiple expansion risk.
2. **Profitability (Score 1–10):** Inspects Gross Margin, Operating Margin, Net Margin, Return on Equity (ROE), and Return on Assets (ROA). Gauges operational efficiency, cost management, and competitive pricing power.
3. **Growth (Score 1–10):** Examines Year-over-Year (YoY) revenue acceleration and EPS expansion rates. Identifies high-growth compounders vs. stagnating businesses.
4. **Financial Health (Score 1–10):** Evaluates balance sheet leverage via Debt-to-Equity (D/E) and short-term liquidity through the Current Ratio. Protects against solvency risks and working capital compression.
5. **Shareholder Value (Score 1–10):** Assesses Dividend Yield sustainability, Payout Ratio conservatism, and capital allocation track record.
6. **Overall Composite Score (Score 1–10):** A weighted composite score summarizing the complete fundamental profile.

### 2. Dual-Layer AI & Local Fallback Engine
- **Cloud Layer (Gemini 1.5 Flash):** When Supabase Edge Functions are connected, the agent executes structured JSON prompting against Google Gemini 1.5 Flash to synthesize macro context, competitive moat analysis, tailored strengths/concerns, and specific investor personas (*e.g., "Long-term quality-growth investors with high risk tolerance"*).
- **Deterministic Local Engine (`fundamentalsExpert.ts`):** If cloud APIs or edge functions are unavailable, a built-in deterministic valuation and scoring engine executes instant mathematical analysis client-side so the app **never fails to deliver insights**.

---

## ⚡ How the Technical Analysis Agent Works

The **Technical Analysis Agent** functions as a real-time quantitative chart analyst, continuously computing trend momentum, support/resistance floors, and moving average crossovers:

### 1. Key Quantitative Indicators
- **Relative Strength Index (RSI 14):** 
  - `< 30`: Oversold (Potential mean-reversion buying opportunity)
  - `30 - 70`: Neutral trading range
  - `> 70`: Overbought (Elevated short-term pullback risk)
- **Moving Average Convergence Divergence (MACD):**
  - Evaluates MACD line vs. Signal line and Histogram divergence (+/-) to detect underlying momentum shifts before price action reflects them.
- **50-Day & 200-Day Simple Moving Averages (SMAs):**
  - **Uptrend / Golden Cross:** 50-day SMA trending above 200-day SMA.
  - **Downtrend / Death Cross:** 50-day SMA trending below 200-day SMA.
- **Support & Resistance Channels:**
  - Dynamic key price levels calculated from 52-week extremes and volatility channels to inform stop-loss and entry target planning.

### 2. Momentum & Trend Classification
The agent synthesizes raw indicator data into concise, human-readable market directives:
- **Momentum:** `Bullish` | `Bearish` | `Neutral`
- **Trend:** `Uptrend` | `Downtrend` | `Sideways`
- **Actionable Narrative:** Generates automated summaries explaining indicator alignment, potential exhaustion zones, and near-term catalyst risks.

---

## 🎯 Consensus Engine & 60% Confidence Gate

To emulate institutional risk management and prevent trading on market noise, AI Stocks Buddy enforces a strict **60% Confidence Gate**:
- When the model conviction score is below **60%**, any directional `BUY` or `SELL` rating is automatically overridden to **`HOLD`**.
- Eliminates false signals during ambiguous consolidation periods and protects capital.

---

## 🛡️ Data Accuracy & Dividend Safeguards

1. **Strict Mathematical Consistency:**
   - Trailing P/E ratios are rigorously validated against `Price / EPS` formulas across all pre-configured and dynamic tickers (e.g. AMD: ~$142.50 price / $1.12 EPS = ~127.2x TTM P/E, 63.3x Forward P/E).
2. **Zero-Dividend Protection:**
   - Growth stocks and non-dividend companies (e.g., `AMD`, `ANET`, `PLTR`, `TSLA`, `UBER`) strictly maintain `0.00%` dividend yield and `0.00%` payout ratio, preventing synthetic dividend generation.
3. **Automated Unit Testing:**
   - Vitest test suite continuously tests valuation math, dividend integrity, and custom ticker generation.

---

## 🌟 Key Features Summary

- **Universal Ticker Search:** Instant data for pre-loaded bluechips (`NVDA`, `AAPL`, `MSFT`, `AMZN`, `GOOGL`, `META`, `TSLA`, `JPM`, `UBER`, `PLTR`, `AMD`, `ANET`) and dynamic procedural generation for any global ticker.
- **Keyboard Shortcut (`⌘K` / `Ctrl+K`):** Instantly focus the search bar from anywhere.
- **Interactive Technical Radar & RSI Gauge:** Visual gauge rendering live momentum boundaries.
- **Personal Watchlist:** Track favorites with quick-add/remove persistence.
- **Live News Feed:** Curated news articles and market sentiment for the selected asset.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Radix UI / shadcn/ui
- **State Management:** Custom React Hooks (`useStockData`, `useFundamentalsExpert`)
- **Backend / Edge Functions:** Supabase Edge Functions (Deno TypeScript)
- **AI Intelligence:** Google Gemini 1.5 Flash (`@google/generative-ai`)
- **Testing:** Vitest, React Testing Library

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Eliahur7/AI-Stocks-Buddy.git
cd AI-Stocks-Buddy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run unit tests
```bash
npm test
```

### 4. Start local development server
```bash
npm run dev
```

Open [http://localhost:8080/](http://localhost:8080/) in your browser.

---

## ⚙️ Supabase Edge Functions Deployment (Optional)

AI Stocks Buddy works **100% out-of-the-box** using client-side engines. To deploy live Gemini AI and market data functions:

```bash
npx supabase login
npx supabase functions deploy stock-data --project-ref <YOUR_PROJECT_REF>
npx supabase functions deploy ai-analysis --project-ref <YOUR_PROJECT_REF>
npx supabase functions deploy fundamentals-expert --project-ref <YOUR_PROJECT_REF>
```

Set required secrets in Supabase dashboard:
- `GEMINI_API_KEY`: Google Gemini API key
- `FMP_API_KEY`: Financial Modeling Prep API key

---

## ⚠️ Disclaimer

*AI Stocks Buddy and its automated agent outputs are for **informational, educational, and research purposes only**. They do not constitute financial, investment, or trading advice. Always conduct independent due diligence before making investment decisions.*
