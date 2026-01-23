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
}

export type Recommendation = 'buy' | 'hold' | 'sell';

export interface StockAnalysis {
  recommendation: Recommendation;
  confidence: number;
  reasons: string[];
  risks: string[];
  summary: string;
}
