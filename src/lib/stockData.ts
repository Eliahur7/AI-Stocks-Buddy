import { StockFundamentals, StockAnalysis, Recommendation, TechnicalIndicators, TechnicalAnalysis } from '@/types/stock';

// Mock stock data for demo purposes
const mockStocks: Record<string, StockFundamentals> = {
  AAPL: {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    price: 228.40,
    change: 1.15,
    changePercent: 0.51,
    marketCap: 3480000000000,
    peRatio: 34.5,
    forwardPE: 28.2,
    pegRatio: 2.4,
    priceToBook: 52.1,
    priceToSales: 8.9,
    eps: 6.62,
    epsGrowth: 12.4,
    revenue: 391000000000,
    revenueGrowth: 6.2,
    grossMargin: 46.2,
    operatingMargin: 30.8,
    netMargin: 24.3,
    roe: 154.2,
    roa: 31.2,
    debtToEquity: 142.5,
    currentRatio: 0.98,
    dividendYield: 0.44,
    payoutRatio: 15.2,
    beta: 1.02,
    fiftyTwoWeekHigh: 237.23,
    fiftyTwoWeekLow: 164.08,
    averageVolume: 52000000,
  },
  MSFT: {
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    sector: 'Technology',
    industry: 'Software - Infrastructure',
    price: 418.50,
    change: -2.10,
    changePercent: -0.50,
    marketCap: 3110000000000,
    peRatio: 35.5,
    forwardPE: 30.2,
    pegRatio: 2.1,
    priceToBook: 12.8,
    priceToSales: 12.7,
    eps: 11.80,
    epsGrowth: 21.8,
    revenue: 245000000000,
    revenueGrowth: 15.6,
    grossMargin: 69.8,
    operatingMargin: 44.6,
    netMargin: 35.8,
    roe: 38.5,
    roa: 19.8,
    debtToEquity: 42.1,
    currentRatio: 1.25,
    dividendYield: 0.72,
    payoutRatio: 25.4,
    beta: 0.89,
    fiftyTwoWeekHigh: 468.35,
    fiftyTwoWeekLow: 385.12,
    averageVolume: 21000000,
  },
  TSLA: {
    symbol: 'TSLA',
    companyName: 'Tesla, Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
    price: 214.20,
    change: -4.50,
    changePercent: -2.06,
    marketCap: 682000000000,
    peRatio: 62.1,
    forwardPE: 48.5,
    pegRatio: 3.8,
    priceToBook: 10.4,
    priceToSales: 7.0,
    eps: 3.45,
    epsGrowth: -23.1,
    revenue: 97000000000,
    revenueGrowth: 3.5,
    grossMargin: 18.2,
    operatingMargin: 8.2,
    netMargin: 7.4,
    roe: 21.5,
    roa: 11.2,
    debtToEquity: 15.2,
    currentRatio: 1.73,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 2.35,
    fiftyTwoWeekHigh: 271.00,
    fiftyTwoWeekLow: 138.80,
    averageVolume: 98000000,
  },
  NVDA: {
    symbol: 'NVDA',
    companyName: 'NVIDIA Corporation',
    sector: 'Technology',
    industry: 'Semiconductors',
    price: 217.50,
    change: 3.25,
    changePercent: 1.52,
    marketCap: 5300000000000,
    peRatio: 33.2,
    forwardPE: 24.1,
    pegRatio: 1.1,
    priceToBook: 28.5,
    priceToSales: 21.2,
    eps: 6.55,
    epsGrowth: 68.5,
    revenue: 118000000000,
    revenueGrowth: 86.4,
    grossMargin: 75.2,
    operatingMargin: 62.1,
    netMargin: 55.4,
    roe: 112.5,
    roa: 52.3,
    debtToEquity: 18.5,
    currentRatio: 3.85,
    dividendYield: 0.08,
    payoutRatio: 2.1,
    beta: 1.68,
    fiftyTwoWeekHigh: 219.80,
    fiftyTwoWeekLow: 90.60,
    averageVolume: 48000000,
  },
  JPM: {
    symbol: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    sector: 'Financial Services',
    industry: 'Banks - Diversified',
    price: 208.50,
    change: 1.80,
    changePercent: 0.87,
    marketCap: 595000000000,
    peRatio: 12.1,
    forwardPE: 11.4,
    pegRatio: 1.2,
    priceToBook: 1.85,
    priceToSales: 3.8,
    eps: 17.20,
    epsGrowth: 14.5,
    revenue: 158000000000,
    revenueGrowth: 11.2,
    grossMargin: 100,
    operatingMargin: 42.5,
    netMargin: 32.8,
    roe: 17.5,
    roa: 1.35,
    debtToEquity: 125.4,
    currentRatio: 1.15,
    dividendYield: 2.21,
    payoutRatio: 26.8,
    beta: 1.12,
    fiftyTwoWeekHigh: 225.48,
    fiftyTwoWeekLow: 143.50,
    averageVolume: 10500000,
  },
  UBER: {
    symbol: 'UBER',
    companyName: 'Uber Technologies, Inc.',
    sector: 'Technology',
    industry: 'Software - Application',
    price: 78.50,
    change: 0.85,
    changePercent: 1.10,
    marketCap: 163000000000,
    peRatio: 36.5,
    forwardPE: 25.4,
    pegRatio: 1.3,
    priceToBook: 11.2,
    priceToSales: 3.6,
    eps: 2.15,
    epsGrowth: 125.4,
    revenue: 45000000000,
    revenueGrowth: 16.2,
    grossMargin: 39.5,
    operatingMargin: 6.8,
    netMargin: 9.8,
    roe: 28.4,
    roa: 6.2,
    debtToEquity: 78.5,
    currentRatio: 1.22,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 1.38,
    fiftyTwoWeekHigh: 87.00,
    fiftyTwoWeekLow: 56.12,
    averageVolume: 18000000,
  },
  GOOGL: {
    symbol: 'GOOGL',
    companyName: 'Alphabet Inc. (Class A)',
    sector: 'Communication Services',
    industry: 'Internet Content & Information',
    price: 168.50,
    change: 1.20,
    changePercent: 0.72,
    marketCap: 2080000000000,
    peRatio: 22.3,
    forwardPE: 19.1,
    pegRatio: 1.15,
    priceToBook: 6.4,
    priceToSales: 6.0,
    eps: 7.55,
    epsGrowth: 31.4,
    revenue: 347000000000,
    revenueGrowth: 14.2,
    grossMargin: 57.2,
    operatingMargin: 29.1,
    netMargin: 24.2,
    roe: 31.5,
    roa: 17.5,
    debtToEquity: 11.8,
    currentRatio: 2.15,
    dividendYield: 0.47,
    payoutRatio: 10.6,
    beta: 1.05,
    fiftyTwoWeekHigh: 191.75,
    fiftyTwoWeekLow: 131.55,
    averageVolume: 24000000,
  },
  AMZN: {
    symbol: 'AMZN',
    companyName: 'Amazon.com, Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Internet Retail',
    price: 186.40,
    change: 2.10,
    changePercent: 1.14,
    marketCap: 1940000000000,
    peRatio: 41.2,
    forwardPE: 32.8,
    pegRatio: 1.45,
    priceToBook: 8.8,
    priceToSales: 3.2,
    eps: 4.52,
    epsGrowth: 92.5,
    revenue: 604000000000,
    revenueGrowth: 10.8,
    grossMargin: 48.2,
    operatingMargin: 10.5,
    netMargin: 8.1,
    roe: 22.4,
    roa: 7.8,
    debtToEquity: 48.5,
    currentRatio: 1.08,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 1.14,
    fiftyTwoWeekHigh: 201.20,
    fiftyTwoWeekLow: 135.20,
    averageVolume: 42000000,
  },
  META: {
    symbol: 'META',
    companyName: 'Meta Platforms, Inc.',
    sector: 'Communication Services',
    industry: 'Internet Content & Information',
    price: 524.50,
    change: 6.20,
    changePercent: 1.20,
    marketCap: 1330000000000,
    peRatio: 25.2,
    forwardPE: 21.5,
    pegRatio: 1.08,
    priceToBook: 8.6,
    priceToSales: 8.5,
    eps: 20.80,
    epsGrowth: 73.2,
    revenue: 156000000000,
    revenueGrowth: 21.8,
    grossMargin: 81.8,
    operatingMargin: 41.2,
    netMargin: 36.5,
    roe: 37.8,
    roa: 19.5,
    debtToEquity: 26.2,
    currentRatio: 2.72,
    dividendYield: 0.38,
    payoutRatio: 9.6,
    beta: 1.21,
    fiftyTwoWeekHigh: 544.23,
    fiftyTwoWeekLow: 279.40,
    averageVolume: 15000000,
  },
  PLTR: {
    symbol: 'PLTR',
    companyName: 'Palantir Technologies Inc.',
    sector: 'Technology',
    industry: 'Software - Infrastructure',
    price: 32.40,
    change: 0.95,
    changePercent: 3.02,
    marketCap: 72000000000,
    peRatio: 101.3,
    forwardPE: 58.2,
    pegRatio: 3.2,
    priceToBook: 16.2,
    priceToSales: 27.5,
    eps: 0.32,
    epsGrowth: 185.0,
    revenue: 2620000000,
    revenueGrowth: 27.2,
    grossMargin: 81.2,
    operatingMargin: 16.5,
    netMargin: 24.8,
    roe: 16.2,
    roa: 11.5,
    debtToEquity: 0,
    currentRatio: 5.92,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 2.45,
    fiftyTwoWeekHigh: 38.50,
    fiftyTwoWeekLow: 14.48,
    averageVolume: 82000000,
  },
  AMD: {
    symbol: 'AMD',
    companyName: 'Advanced Micro Devices, Inc.',
    sector: 'Technology',
    industry: 'Semiconductors',
    price: 142.50,
    change: 3.20,
    changePercent: 2.30,
    marketCap: 230000000000,
    peRatio: 77.0,
    forwardPE: 28.5,
    pegRatio: 1.4,
    priceToBook: 4.2,
    priceToSales: 9.6,
    eps: 1.85,
    epsGrowth: 45.2,
    revenue: 24200000000,
    revenueGrowth: 8.8,
    grossMargin: 51.2,
    operatingMargin: 6.8,
    netMargin: 12.4,
    roe: 5.4,
    roa: 3.2,
    debtToEquity: 5.8,
    currentRatio: 2.85,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 1.68,
    fiftyTwoWeekHigh: 227.30,
    fiftyTwoWeekLow: 116.50,
    averageVolume: 52000000,
  },
};

const knownNames: Record<string, { name: string; sector: string; industry: string; price: number; eps: number }> = {
  PGY: { name: 'Pagaya Technologies Ltd.', sector: 'Financial Services', industry: 'Financial Data & Stock Exchanges', price: 12.85, eps: 0.42 },
  INTC: { name: 'Intel Corporation', sector: 'Technology', industry: 'Semiconductors', price: 20.45, eps: 0.85 },
  DIS: { name: 'The Walt Disney Company', sector: 'Communication Services', industry: 'Entertainment', price: 95.80, eps: 4.25 },
  NFLX: { name: 'Netflix, Inc.', sector: 'Communication Services', industry: 'Entertainment', price: 685.20, eps: 18.50 },
  BABA: { name: 'Alibaba Group Holding Limited', sector: 'Consumer Cyclical', industry: 'Internet Retail', price: 84.50, eps: 6.20 },
  SOFI: { name: 'SoFi Technologies, Inc.', sector: 'Financial Services', industry: 'Financial Data', price: 7.85, eps: 0.15 },
  HOOD: { name: 'Robinhood Markets, Inc.', sector: 'Financial Services', industry: 'Capital Markets', price: 22.40, eps: 0.58 },
  CRWD: { name: 'CrowdStrike Holdings, Inc.', sector: 'Technology', industry: 'Software - Infrastructure', price: 268.50, eps: 3.85 },
  ARM: { name: 'Arm Holdings plc', sector: 'Technology', industry: 'Semiconductors', price: 128.40, eps: 1.45 },
  RIVN: { name: 'Rivian Automotive, Inc.', sector: 'Consumer Cyclical', industry: 'Auto Manufacturers', price: 14.20, eps: -3.85 },
  LCID: { name: 'Lucid Group, Inc.', sector: 'Consumer Cyclical', industry: 'Auto Manufacturers', price: 3.15, eps: -1.15 },
  PYPL: { name: 'PayPal Holdings, Inc.', sector: 'Financial Services', industry: 'Credit Services', price: 68.50, eps: 4.15 },
  SQ: { name: 'Block, Inc.', sector: 'Financial Services', industry: 'Credit Services', price: 64.20, eps: 2.18 },
  SPY: { name: 'SPDR S&P 500 ETF Trust', sector: 'Financial Services', industry: 'Exchange Traded Fund', price: 545.20, eps: 22.50 },
  QQQ: { name: 'Invesco QQQ Trust', sector: 'Technology', industry: 'Exchange Traded Fund', price: 475.80, eps: 18.20 },
};

function generateDynamicStockData(symbol: string): StockFundamentals {
  const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const known = knownNames[symbol];

  const companyName = known?.name || `${symbol} Corp.`;
  const sector = known?.sector || (hash % 2 === 0 ? 'Technology' : 'Financial Services');
  const industry = known?.industry || 'Software - Application';

  const price = known?.price || Math.max(5, ((hash * 17) % 350) + ((hash % 99) / 100));
  const change = Number((((hash % 100) - 45) / 20).toFixed(2));
  const changePercent = Number(((change / price) * 100).toFixed(2));

  const eps = known?.eps !== undefined ? known.eps : Number((price / Math.max(12, (hash % 45) + 10)).toFixed(2));
  const peRatio = eps > 0 ? Number((price / eps).toFixed(1)) : -15.0;
  const forwardPE = Number((peRatio * 0.82).toFixed(1));
  const marketCap = (hash * 1500000000) % 850000000000 + 2000000000;

  const fiftyTwoWeekLow = Number((price * 0.72).toFixed(2));
  const fiftyTwoWeekHigh = Number((price * 1.38).toFixed(2));

  return {
    symbol,
    companyName,
    sector,
    industry,
    price,
    change,
    changePercent,
    marketCap,
    peRatio,
    forwardPE,
    pegRatio: Number(((hash % 25) / 10 + 0.8).toFixed(2)),
    priceToBook: Number(((hash % 15) + 2.5).toFixed(1)),
    priceToSales: Number(((hash % 12) + 1.8).toFixed(1)),
    eps,
    epsGrowth: Number((((hash % 80) - 20) * 1.5).toFixed(1)),
    revenue: marketCap * 0.35,
    revenueGrowth: Number(((hash % 35) + 5).toFixed(1)),
    grossMargin: Number(((hash % 40) + 45).toFixed(1)),
    operatingMargin: Number(((hash % 25) + 10).toFixed(1)),
    netMargin: Number(((hash % 20) + 8).toFixed(1)),
    roe: Number(((hash % 30) + 12).toFixed(1)),
    roa: Number(((hash % 15) + 5).toFixed(1)),
    debtToEquity: Number(((hash % 80) + 10).toFixed(1)),
    currentRatio: Number(((hash % 20) / 10 + 1.1).toFixed(2)),
    dividendYield: hash % 3 === 0 ? Number(((hash % 40) / 10).toFixed(2)) : 0,
    payoutRatio: hash % 3 === 0 ? Number(((hash % 30) + 15).toFixed(1)) : 0,
    beta: Number(((hash % 15) / 10 + 0.8).toFixed(2)),
    fiftyTwoWeekHigh,
    fiftyTwoWeekLow,
    averageVolume: (hash * 250000) % 50000000 + 5000000,
    news: [
      {
        symbol,
        publishedDate: new Date().toISOString(),
        title: `${companyName} (${symbol}) Reports Financial Results and Growth Highlights`,
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
        site: 'Financial News',
        text: `Analysts review quarterly metrics and fundamental performance trends for ${companyName}.`,
        url: `https://finance.yahoo.com/quote/${symbol}`,
      },
      {
        symbol,
        publishedDate: new Date(Date.now() - 86400000).toISOString(),
        title: `Market Outlook: Technical & Fundamental Position for ${symbol}`,
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400',
        site: 'MarketWatch',
        text: `In-depth look at trading volume, margins, and intrinsic value valuation models for ${companyName}.`,
        url: `https://finance.yahoo.com/quote/${symbol}`,
      }
    ]
  };
}

export function getStockData(symbol: string): StockFundamentals | null {
  const upperSymbol = symbol.toUpperCase().trim();
  let rawStock = mockStocks[upperSymbol];

  if (!rawStock) {
    rawStock = generateDynamicStockData(upperSymbol);
  }

  // Clone object to avoid mutating raw template
  const stock: StockFundamentals = { ...rawStock };

  // Enforce mathematical consistency: P/E ratio = price / eps when eps > 0
  if (stock.eps > 0) {
    stock.peRatio = Number((stock.price / stock.eps).toFixed(1));
  }

  if (!stock.technicals) {
    // Generate plausible technicals based on price and change
    const isPositive = stock.changePercent >= 0;
    const rsiBase = isPositive ? 55 : 45;
    const rsi = Math.min(85, Math.max(15, rsiBase + (stock.changePercent * 3)));

    stock.technicals = {
      rsi,
      macd: {
        value: stock.change * 0.5,
        signal: stock.change * 0.4,
        histogram: stock.change * 0.1
      },
      sma50: stock.price * (1 - (stock.changePercent / 100) * 0.2),
      sma200: stock.price * (1 - (stock.changePercent / 100) * 0.8),
      support: stock.fiftyTwoWeekLow + (stock.price - stock.fiftyTwoWeekLow) * 0.3,
      resistance: stock.price + (stock.fiftyTwoWeekHigh - stock.price) * 0.7,
    };
  }

  return stock;
}

export function analyzeTechnicals(technicals: TechnicalIndicators): TechnicalAnalysis {
  let momentum: 'Bullish' | 'Bearish' | 'Neutral' = 'Neutral';
  let trend: 'Uptrend' | 'Downtrend' | 'Sideways' = 'Sideways';

  if (technicals.rsi > 55 && technicals.macd.histogram > 0) {
    momentum = 'Bullish';
  } else if (technicals.rsi < 45 && technicals.macd.histogram < 0) {
    momentum = 'Bearish';
  }

  if (technicals.sma50 > technicals.sma200) {
    trend = 'Uptrend';
  } else if (technicals.sma50 < technicals.sma200) {
    trend = 'Downtrend';
  }

  let summary = `The technical indicators suggest a ${momentum.toLowerCase()} momentum within an overall ${trend.toLowerCase()}. `;

  if (technicals.rsi > 70) {
    summary += `With RSI at ${technicals.rsi.toFixed(1)}, the asset is entering overbought territory, suggesting potential exhaustion. `;
  } else if (technicals.rsi < 30) {
    summary += `With RSI at ${technicals.rsi.toFixed(1)}, the asset is oversold, which may attract value buyers. `;
  } else {
    summary += `The RSI sits in neutral territory at ${technicals.rsi.toFixed(1)}. `;
  }

  summary += `Current support is found around $${technicals.support.toFixed(2)} with near-term resistance at $${technicals.resistance.toFixed(2)}. `;

  if (technicals.macd.histogram > 0) {
    summary += `MACD shows positive divergence, supporting upside movement.`;
  } else {
    summary += `MACD indicates negative divergence, signaling downside pressure.`;
  }

  return { momentum, trend, summary };
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
    risks.push('High valuation multiple creates downside risk');
  }

  if (fundamentals.pegRatio < 1.0 && fundamentals.pegRatio > 0) {
    score += 8;
    reasons.push('PEG ratio below 1.0 indicates value relative to growth');
  }

  // Profitability analysis
  if (fundamentals.operatingMargin > 20) {
    score += 10;
    reasons.push('Strong operating margins demonstrate pricing power');
  }

  if (fundamentals.roe > 15) {
    score += 8;
    reasons.push('High Return on Equity shows efficient capital use');
  }

  // Growth analysis
  if (fundamentals.revenueGrowth > 15) {
    score += 10;
    reasons.push('Robust revenue growth signals business expansion');
  } else if (fundamentals.revenueGrowth < 0) {
    score -= 12;
    risks.push('Declining revenue highlights top-line pressure');
  }

  if (fundamentals.epsGrowth > 20) {
    score += 8;
    reasons.push('Accelerating EPS growth supports price momentum');
  }

  // Balance sheet health
  if (fundamentals.debtToEquity > 150) {
    score -= 10;
    risks.push('High leverage increases financial vulnerability');
  } else if (fundamentals.debtToEquity < 50) {
    score += 5;
    reasons.push('Conservative debt levels provide balance sheet safety');
  }

  if (fundamentals.currentRatio < 1.0 && fundamentals.currentRatio > 0) {
    score -= 8;
    risks.push('Current ratio below 1.0 suggests liquidity constraints');
  }

  // Dividends
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

  // Determine recommendation from score
  let recommendation: Recommendation;
  if (score >= 65) {
    recommendation = 'buy';
  } else if (score <= 40) {
    recommendation = 'sell';
  } else {
    recommendation = 'hold';
  }

  // Normalize confidence: distance from neutral (50), scaled to 0-100
  const rawConfidence = Math.abs(score - 50) * 2;
  const confidence = Math.min(Math.max(rawConfidence, 10), 95);

  // ── Confidence gate ──────────────────────────────────────────────────────────
  if (confidence < 60 && recommendation !== 'hold') {
    recommendation = 'hold';
  }
  // ─────────────────────────────────────────────────────────────────────────────

  // Generate summary
  let summary: string;
  if (recommendation === 'buy') {
    summary = `${fundamentals.companyName} presents a compelling investment opportunity. The company demonstrates strong fundamentals with ${reasons.slice(0, 2).join(' and ').toLowerCase()}. While investors should monitor ${risks[0]?.toLowerCase() || 'general market conditions'}, the overall risk-reward profile favors accumulation.`;
  } else if (recommendation === 'sell') {
    summary = `${fundamentals.companyName} faces several headwinds that warrant caution. Key concerns include ${risks.slice(0, 2).join(' and ').toLowerCase()}. Consider reducing exposure or taking profits on any rallies until fundamentals improve.`;
  } else if (confidence < 60) {
    summary = `${fundamentals.companyName} shows a mixed fundamental picture with insufficient conviction for a directional call (confidence: ${Math.round(confidence)}%). Positives include ${reasons[0]?.toLowerCase() || 'stable operations'}, but risks around ${risks[0]?.toLowerCase() || 'valuation'} offset the upside. A hold is recommended until the picture clarifies.`;
  } else {
    summary = `${fundamentals.companyName} presents a mixed picture. While there are positives like ${reasons[0]?.toLowerCase() || 'stable operations'}, concerns around ${risks[0]?.toLowerCase() || 'valuation'} suggest waiting for a better entry point or catalyst.`;
  }

  return {
    recommendation,
    confidence: Math.round(confidence),
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
