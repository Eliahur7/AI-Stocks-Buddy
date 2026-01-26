import { StockFundamentals, StockAnalysis, Recommendation } from '@/types/stock';

// Mock stock data for demo purposes
const mockStocks: Record<string, StockFundamentals> = {
  AAPL: {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    price: 178.72,
    change: 2.45,
    changePercent: 1.39,
    marketCap: 2780000000000,
    peRatio: 28.5,
    forwardPE: 26.2,
    pegRatio: 2.1,
    priceToBook: 45.8,
    priceToSales: 7.2,
    eps: 6.27,
    epsGrowth: 8.5,
    revenue: 385000000000,
    revenueGrowth: 2.1,
    grossMargin: 43.8,
    operatingMargin: 29.8,
    netMargin: 25.3,
    roe: 147.2,
    roa: 28.3,
    debtToEquity: 181.2,
    currentRatio: 0.99,
    dividendYield: 0.52,
    payoutRatio: 14.8,
    beta: 1.28,
    fiftyTwoWeekHigh: 199.62,
    fiftyTwoWeekLow: 164.08,
    averageVolume: 58000000,
  },
  MSFT: {
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    sector: 'Technology',
    industry: 'Software - Infrastructure',
    price: 378.91,
    change: 4.23,
    changePercent: 1.13,
    marketCap: 2810000000000,
    peRatio: 35.2,
    forwardPE: 30.1,
    pegRatio: 2.4,
    priceToBook: 11.8,
    priceToSales: 12.5,
    eps: 10.76,
    epsGrowth: 15.2,
    revenue: 227000000000,
    revenueGrowth: 12.8,
    grossMargin: 69.4,
    operatingMargin: 44.2,
    netMargin: 36.7,
    roe: 38.5,
    roa: 19.2,
    debtToEquity: 36.8,
    currentRatio: 1.77,
    dividendYield: 0.72,
    payoutRatio: 25.1,
    beta: 0.89,
    fiftyTwoWeekHigh: 384.30,
    fiftyTwoWeekLow: 275.37,
    averageVolume: 21000000,
  },
  TSLA: {
    symbol: 'TSLA',
    companyName: 'Tesla, Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
    price: 248.50,
    change: -8.32,
    changePercent: -3.24,
    marketCap: 790000000000,
    peRatio: 72.4,
    forwardPE: 58.3,
    pegRatio: 3.8,
    priceToBook: 12.1,
    priceToSales: 8.2,
    eps: 3.43,
    epsGrowth: -23.1,
    revenue: 96000000000,
    revenueGrowth: 18.8,
    grossMargin: 18.2,
    operatingMargin: 9.2,
    netMargin: 11.4,
    roe: 22.4,
    roa: 10.8,
    debtToEquity: 18.4,
    currentRatio: 1.73,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 2.31,
    fiftyTwoWeekHigh: 299.29,
    fiftyTwoWeekLow: 138.80,
    averageVolume: 118000000,
  },
  NVDA: {
    symbol: 'NVDA',
    companyName: 'NVIDIA Corporation',
    sector: 'Technology',
    industry: 'Semiconductors',
    price: 495.22,
    change: 12.87,
    changePercent: 2.67,
    marketCap: 1220000000000,
    peRatio: 65.3,
    forwardPE: 28.4,
    pegRatio: 1.2,
    priceToBook: 38.5,
    priceToSales: 22.8,
    eps: 7.59,
    epsGrowth: 586.2,
    revenue: 61000000000,
    revenueGrowth: 122.4,
    grossMargin: 72.7,
    operatingMargin: 54.1,
    netMargin: 48.9,
    roe: 91.5,
    roa: 45.3,
    debtToEquity: 41.2,
    currentRatio: 4.17,
    dividendYield: 0.04,
    payoutRatio: 1.1,
    beta: 1.72,
    fiftyTwoWeekHigh: 502.66,
    fiftyTwoWeekLow: 222.97,
    averageVolume: 52000000,
  },
  JPM: {
    symbol: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    sector: 'Financial Services',
    industry: 'Banks - Diversified',
    price: 172.45,
    change: 1.23,
    changePercent: 0.72,
    marketCap: 495000000000,
    peRatio: 10.2,
    forwardPE: 9.8,
    pegRatio: 1.8,
    priceToBook: 1.6,
    priceToSales: 3.5,
    eps: 16.92,
    epsGrowth: 32.4,
    revenue: 142000000000,
    revenueGrowth: 21.5,
    grossMargin: 0,
    operatingMargin: 38.2,
    netMargin: 32.8,
    roe: 16.4,
    roa: 1.23,
    debtToEquity: 125.4,
    currentRatio: 0,
    dividendYield: 2.44,
    payoutRatio: 24.8,
    beta: 1.08,
    fiftyTwoWeekHigh: 178.15,
    fiftyTwoWeekLow: 123.11,
    averageVolume: 9800000,
  },
  ASTS: {
    symbol: 'ASTS',
    companyName: 'AST SpaceMobile, Inc.',
    sector: 'Communication Services',
    industry: 'Telecom Services',
    price: 28.45,
    change: 1.82,
    changePercent: 6.84,
    marketCap: 8900000000,
    peRatio: -15.2,
    forwardPE: -22.4,
    pegRatio: 0,
    priceToBook: 18.5,
    priceToSales: 445.2,
    eps: -1.87,
    epsGrowth: 0,
    revenue: 20000000,
    revenueGrowth: 150.0,
    grossMargin: 0,
    operatingMargin: -850.2,
    netMargin: -920.5,
    roe: -42.3,
    roa: -18.7,
    debtToEquity: 85.4,
    currentRatio: 2.85,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 2.45,
    fiftyTwoWeekHigh: 39.08,
    fiftyTwoWeekLow: 2.43,
    averageVolume: 28000000,
  },
  RKLB: {
    symbol: 'RKLB',
    companyName: 'Rocket Lab USA, Inc.',
    sector: 'Industrials',
    industry: 'Aerospace & Defense',
    price: 27.85,
    change: 0.95,
    changePercent: 3.53,
    marketCap: 13500000000,
    peRatio: -58.4,
    forwardPE: -42.1,
    pegRatio: 0,
    priceToBook: 12.8,
    priceToSales: 32.5,
    eps: -0.48,
    epsGrowth: 45.2,
    revenue: 415000000,
    revenueGrowth: 78.5,
    grossMargin: 28.4,
    operatingMargin: -32.1,
    netMargin: -28.5,
    roe: -18.2,
    roa: -8.4,
    debtToEquity: 42.1,
    currentRatio: 3.12,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 2.18,
    fiftyTwoWeekHigh: 29.55,
    fiftyTwoWeekLow: 4.20,
    averageVolume: 35000000,
  },
};

export function getStockData(symbol: string): StockFundamentals | null {
  const upperSymbol = symbol.toUpperCase().trim();
  return mockStocks[upperSymbol] || null;
}

export function analyzeStock(fundamentals: StockFundamentals): StockAnalysis {
  let score = 50; // Start neutral
  const reasons: string[] = [];
  const risks: string[] = [];

  // Valuation analysis
  if (fundamentals.peRatio < 15) {
    score += 10;
    reasons.push('Attractive P/E ratio suggests undervaluation');
  } else if (fundamentals.peRatio > 40) {
    score -= 10;
    risks.push('High P/E ratio indicates premium valuation');
  }

  if (fundamentals.pegRatio < 1.5) {
    score += 8;
    reasons.push('PEG ratio below 1.5 suggests good value relative to growth');
  } else if (fundamentals.pegRatio > 3) {
    score -= 8;
    risks.push('High PEG ratio indicates expensive relative to growth');
  }

  // Growth analysis
  if (fundamentals.epsGrowth > 20) {
    score += 12;
    reasons.push(`Strong EPS growth of ${fundamentals.epsGrowth.toFixed(1)}%`);
  } else if (fundamentals.epsGrowth < 0) {
    score -= 15;
    risks.push('Negative earnings growth is concerning');
  }

  if (fundamentals.revenueGrowth > 15) {
    score += 8;
    reasons.push(`Solid revenue growth of ${fundamentals.revenueGrowth.toFixed(1)}%`);
  } else if (fundamentals.revenueGrowth < 0) {
    score -= 10;
    risks.push('Declining revenue signals potential problems');
  }

  // Profitability analysis
  if (fundamentals.netMargin > 20) {
    score += 8;
    reasons.push('Excellent profit margins demonstrate pricing power');
  } else if (fundamentals.netMargin < 5) {
    score -= 5;
    risks.push('Thin profit margins leave little room for error');
  }

  if (fundamentals.roe > 20) {
    score += 6;
    reasons.push('High ROE shows efficient use of shareholder equity');
  }

  // Financial health
  if (fundamentals.currentRatio > 1.5) {
    score += 4;
    reasons.push('Strong liquidity position');
  } else if (fundamentals.currentRatio < 1 && fundamentals.currentRatio > 0) {
    score -= 6;
    risks.push('Low current ratio may indicate liquidity concerns');
  }

  if (fundamentals.debtToEquity > 100) {
    score -= 5;
    risks.push('High debt levels increase financial risk');
  }

  // Dividend analysis
  if (fundamentals.dividendYield > 2) {
    score += 4;
    reasons.push('Attractive dividend yield provides income');
  }

  // Beta analysis
  if (fundamentals.beta > 1.5) {
    risks.push('Higher volatility than the overall market');
  } else if (fundamentals.beta < 0.8) {
    reasons.push('Lower volatility provides stability');
  }

  // Price position
  const priceRange = fundamentals.fiftyTwoWeekHigh - fundamentals.fiftyTwoWeekLow;
  const pricePosition = (fundamentals.price - fundamentals.fiftyTwoWeekLow) / priceRange;
  
  if (pricePosition < 0.3) {
    score += 5;
    reasons.push('Trading near 52-week lows may offer value opportunity');
  } else if (pricePosition > 0.9) {
    risks.push('Trading near 52-week highs may limit upside');
  }

  // Determine recommendation
  let recommendation: Recommendation;
  if (score >= 65) {
    recommendation = 'buy';
  } else if (score <= 40) {
    recommendation = 'sell';
  } else {
    recommendation = 'hold';
  }

  // Normalize confidence
  const confidence = Math.min(Math.max(Math.abs(score - 50) * 2, 30), 95);

  // Generate summary
  let summary: string;
  if (recommendation === 'buy') {
    summary = `${fundamentals.companyName} presents a compelling investment opportunity. The company demonstrates strong fundamentals with ${reasons.slice(0, 2).join(' and ').toLowerCase()}. While investors should monitor ${risks[0]?.toLowerCase() || 'general market conditions'}, the overall risk-reward profile favors accumulation.`;
  } else if (recommendation === 'sell') {
    summary = `${fundamentals.companyName} faces several headwinds that warrant caution. Key concerns include ${risks.slice(0, 2).join(' and ').toLowerCase()}. Consider reducing exposure or taking profits on any rallies until fundamentals improve.`;
  } else {
    summary = `${fundamentals.companyName} presents a mixed picture. While there are positives like ${reasons[0]?.toLowerCase() || 'stable operations'}, concerns around ${risks[0]?.toLowerCase() || 'valuation'} suggest waiting for a better entry point or catalyst.`;
  }

  return {
    recommendation,
    confidence,
    reasons: reasons.slice(0, 4),
    risks: risks.slice(0, 4),
    summary,
  };
}

export function formatMarketCap(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
}

export function formatLargeNumber(value: number): string {
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
  return value.toLocaleString();
}
