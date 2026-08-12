# 📈 AI Stocks Buddy

[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase Edge Functions](https://img.shields.io/badge/Supabase-Edge_Functions-green.svg?logo=supabase)](https://supabase.com/)
[![Gemini 1.5 Flash](https://img.shields.io/badge/AI-Gemini_1.5_Flash-orange.svg?logo=google)](https://deepmind.google/technologies/gemini/)

**AI Stocks Buddy** is an autonomous multi-agent stock market intelligence platform. Designed with modern glassmorphism aesthetics and responsive dark-mode styling, it delivers deep fundamental quality ratings, technical chart analysis, and AI-driven investment consensus for any stock ticker.

---

## 🤖 Multi-Agent AI Architecture

AI Stocks Buddy deploys specialized autonomous agents to analyze financial markets from multiple perspectives:

```
                          ┌───────────────────────────┐
                          │   User Search (e.g. NVDA) │
                          └─────────────┬─────────────┘
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
┌─────────────────────────┐                               ┌─────────────────────────┐
│  Fundamentals Expert 🧠 │                               │   Technical Expert ⚡  │
├─────────────────────────┤                               ├─────────────────────────┤
│ • 6-Dimension Scoring   │                               │ • RSI 14 Visual Gauge   │
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

## 🌟 Key Features

### 🧠 1. Fundamentals Expert Agent
- **6-Dimension Scoring (1–10):** Evaluates stocks across **Valuation**, **Profitability**, **Growth**, **Financial Health**, **Shareholder Value**, and **Overall Composite**.
- **Gemini 1.5 Flash & Local Engine Dual-Layer:** Runs powered by Google Gemini AI when connected to Supabase edge functions, with an immediate, client-side fallback engine so analysis **never fails** out-of-the-box.
- **Verdicts & Profiling:** Generates detailed text verdicts per dimension, 3 key strengths, 3 key concerns, and an investor suitability profile (*e.g., "Quality-growth investors with a 3–5 year horizon"*).

### ⚡ 2. Technical Expert Agent
- **RSI (14) Visual Gauge:** Interactive meter rendering real-time Relative Strength Index across *Oversold (<30)*, *Neutral (30–70)*, and *Overbought (>70)* zones.
- **Momentum & Trend Engine:** Classifies market momentum (*Bullish*, *Bearish*, *Neutral*) and overall structural trend (*Uptrend*, *Downtrend*, *Sideways*).
- **Key Technical Levels:** Computes short-term 50-day SMA, long-term 200-day SMA, price Support floor, Resistance ceiling, and MACD divergence (+/-).

### 🎯 3. AI Consensus & Risk Guard
- **60% Confidence Gate:** Enforces institutional risk-management rules — if model confidence falls below 60%, the recommendation defaults to **HOLD** to protect against trading on market noise.
- **Key Catalysts & Risks:** Bulleted breakdown of upside catalysts and downside risk factors.

### 📊 4. Interactive Dashboard & User Experience
- **Universal Ticker Support:** Pre-loaded with major tickers (`NVDA`, `AAPL`, `MSFT`, `AMZN`, `GOOGL`, `META`, `TSLA`, `JPM`, `UBER`, `PLTR`, `AMD`) plus a universal generator for any custom ticker (`PGY`, `DIS`, `NFLX`, `BABA`, `SOFI`, `ARM`, etc.).
- **Keyboard Shortcut (`⌘K`):** Instantly focus the search bar from anywhere.
- **Personal Watchlist:** Track favorite symbols with quick-add toggles.
- **Live News Feed:** Real-time financial market news tailored to the selected stock.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, shadcn/ui
- **State Management:** Custom React Hooks (`useStockData`, `useFundamentalsExpert`)
- **Backend / Edge:** Supabase Edge Functions (Deno TypeScript)
- **AI Models:** Google Gemini 1.5 Flash (`@google/generative-ai`)
- **Market Data:** Financial Modeling Prep (FMP) API with client-side fallback

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

### 3. Run development server
```bash
npm run dev
```

Open `http://localhost:8080/` in your browser.

---

## ⚙️ Environment & Supabase Edge Functions (Optional)

AI Stocks Buddy works **100% out-of-the-box** using built-in fallback engines. To enable live Gemini AI analysis and Financial Modeling Prep data:

1. **Deploy Edge Functions:**
   ```bash
   npx supabase login
   npx supabase functions deploy stock-data --project-ref <YOUR_PROJECT_REF>
   npx supabase functions deploy ai-analysis --project-ref <YOUR_PROJECT_REF>
   npx supabase functions deploy fundamentals-expert --project-ref <YOUR_PROJECT_REF>
   ```

2. **Set Secrets in Supabase:**
   - `GEMINI_API_KEY`: Your Google Gemini API Key
   - `FMP_API_KEY`: Your Financial Modeling Prep API Key

---

## ⚠️ Disclaimer

*AI Stocks Buddy and its automated agent outputs are for **informational and educational purposes only**. They do not constitute financial or investment advice. Always perform independent due diligence or consult a licensed financial advisor before making trading decisions.*
