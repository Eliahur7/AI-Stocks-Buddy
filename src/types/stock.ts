export interface StockFundamentals {
  symbol: string;
  companyName: string;
  sector: string;
  industry: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  peRatio: number;
  forwardPE: number;
  pegRatio: number;
  priceToBook: number;
  priceToSales: number;
  eps: number;
  epsGrowth: number;
  revenue: number;
  revenueGrowth: number;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  roe: number;
  roa: number;
  debtToEquity: number;
  currentRatio: number;
  dividendYield: number;
  payoutRatio: number;
  beta: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  averageVolume: number;
  historical?: {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
  news?: {
    symbol: string;
    publishedDate: string;
    title: string;
    image: string;
    site: string;
    text: string;
    url: string;
  }[];
  technicals?: TechnicalIndicators;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: {
    value: number;
    signal: number;
    histogram: number;
  };
  sma50: number;
  sma200: number;
  support: number;
  resistance: number;
}

export interface TechnicalAnalysis {
  momentum: 'Bullish' | 'Bearish' | 'Neutral';
  trend: 'Uptrend' | 'Downtrend' | 'Sideways';
  summary: string;
}

export type Recommendation = 'buy' | 'hold' | 'sell';

export interface StockAnalysis {
  recommendation: Recommendation;
  confidence: number;
  reasons: string[];
  risks: string[];
  summary: string;
}

export interface FundamentalsExpertAnalysis {
  valuationScore: number;
  profitabilityScore: number;
  growthScore: number;
  financialHealthScore: number;
  shareholderValueScore: number;
  overallScore: number;
  valuationVerdict: string;
  profitabilityVerdict: string;
  growthVerdict: string;
  financialHealthVerdict: string;
  shareholderValueVerdict: string;
  expertSummary: string;
  strengths: string[];
  concerns: string[];
  investorProfile: string;
}
