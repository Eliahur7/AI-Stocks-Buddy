# AI Stocks Buddy

**AI Stocks Buddy** is a modern, responsive web application that provides real-time stock insights, technical analysis, and AI-powered recommendations. Built with Vite, React, and TypeScript, it offers a beautifully designed interface for tracking your favorite stocks.

## Features

- **Real-Time Data & Fundamentals**: View current pricing, daily changes, and deep fundamental data (P/E ratios, EPS, Market Cap, etc.).
- **Interactive Charts**: Clean, easy-to-read historical price charts.
- **AI Recommendation Engine**: Automated analysis of fundamentals, generating Buy/Hold/Sell recommendations, confidence scores, and concise bullet points for risks and reasons.
- **Technical Expert Agent**: Built-in automated technical analysis interpreting RSI, MACD, Moving Averages, and Support/Resistance levels into natural language.
- **Personal Watchlist**: Track your favorite tickers with at-a-glance performance metrics.
- **Latest News**: Contextual news feed tailored to the selected stock.

## Tech Stack

- **Frontend Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS & shadcn-ui
- **Icons**: Lucide React
- **Data & APIs**: 
  - Supports Financial Modeling Prep (FMP) for real-time stock data.
  - Supports Google Gemini API for AI-powered fundamental analysis.
  - *Note: Currently configured to use local mock data for seamless out-of-the-box testing without requiring API keys.*

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GIT_URL>
   cd stock-buddy-insights/stock-buddy-insights
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:8080/` (or the port specified in your terminal).

## Usage

Simply search for a ticker symbol (e.g., `AAPL`, `MSFT`, `TSLA`, `NVDA`) using the search bar at the top of the application to view its dashboard.

## Disclaimer

This application and its AI-generated analysis are for **educational purposes only** and should not be considered financial advice. Always do your own research and consult with a qualified financial advisor before making investment decisions.
