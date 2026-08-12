import { StockFundamentals, StockAnalysis, Recommendation, TechnicalIndicators, TechnicalAnalysis } from '@/types/stock';

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
  // Space Stocks
  SPCE: {
    symbol: 'SPCE',
    companyName: 'Virgin Galactic Holdings, Inc.',
    sector: 'Industrials',
    industry: 'Aerospace & Defense',
    price: 6.82,
    change: -0.18,
    changePercent: -2.57,
    marketCap: 2100000000,
    peRatio: -2.8,
    forwardPE: -3.5,
    pegRatio: 0,
    priceToBook: 3.2,
    priceToSales: 28.4,
    eps: -2.45,
    epsGrowth: 0,
    revenue: 74000000,
    revenueGrowth: 820.5,
    grossMargin: -185.2,
    operatingMargin: -425.8,
    netMargin: -445.2,
    roe: -68.5,
    roa: -32.1,
    debtToEquity: 52.3,
    currentRatio: 4.85,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 2.85,
    fiftyTwoWeekHigh: 11.28,
    fiftyTwoWeekLow: 4.92,
    averageVolume: 8500000,
  },
  LUNR: {
    symbol: 'LUNR',
    companyName: 'Intuitive Machines, Inc.',
    sector: 'Industrials',
    industry: 'Aerospace & Defense',
    price: 18.45,
    change: 0.72,
    changePercent: 4.06,
    marketCap: 3200000000,
    peRatio: -12.4,
    forwardPE: -18.2,
    pegRatio: 0,
    priceToBook: 8.5,
    priceToSales: 15.8,
    eps: -1.49,
    epsGrowth: 0,
    revenue: 203000000,
    revenueGrowth: 128.5,
    grossMargin: 8.2,
    operatingMargin: -45.8,
    netMargin: -52.1,
    roe: -85.2,
    roa: -28.4,
    debtToEquity: 125.8,
    currentRatio: 1.45,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 2.12,
    fiftyTwoWeekHigh: 24.50,
    fiftyTwoWeekLow: 3.20,
    averageVolume: 12000000,
  },
  RDW: {
    symbol: 'RDW',
    companyName: 'Redwire Corporation',
    sector: 'Industrials',
    industry: 'Aerospace & Defense',
    price: 12.85,
    change: 0.45,
    changePercent: 3.63,
    marketCap: 1100000000,
    peRatio: -8.5,
    forwardPE: -12.1,
    pegRatio: 0,
    priceToBook: 4.2,
    priceToSales: 3.8,
    eps: -1.51,
    epsGrowth: 0,
    revenue: 290000000,
    revenueGrowth: 45.2,
    grossMargin: 22.5,
    operatingMargin: -18.4,
    netMargin: -22.8,
    roe: -42.5,
    roa: -12.8,
    debtToEquity: 85.2,
    currentRatio: 1.82,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 1.95,
    fiftyTwoWeekHigh: 15.80,
    fiftyTwoWeekLow: 4.85,
    averageVolume: 2500000,
  },
  // Data Center Stocks
  EQIX: {
    symbol: 'EQIX',
    companyName: 'Equinix, Inc.',
    sector: 'Real Estate',
    industry: 'REIT - Specialty',
    price: 925.50,
    change: 12.35,
    changePercent: 1.35,
    marketCap: 88000000000,
    peRatio: 82.5,
    forwardPE: 68.2,
    pegRatio: 3.8,
    priceToBook: 5.8,
    priceToSales: 10.2,
    eps: 11.22,
    epsGrowth: 15.8,
    revenue: 8600000000,
    revenueGrowth: 12.4,
    grossMargin: 48.2,
    operatingMargin: 18.5,
    netMargin: 12.8,
    roe: 7.2,
    roa: 2.8,
    debtToEquity: 145.8,
    currentRatio: 1.15,
    dividendYield: 1.85,
    payoutRatio: 152.4,
    beta: 0.82,
    fiftyTwoWeekHigh: 985.00,
    fiftyTwoWeekLow: 702.50,
    averageVolume: 450000,
  },
  DLR: {
    symbol: 'DLR',
    companyName: 'Digital Realty Trust, Inc.',
    sector: 'Real Estate',
    industry: 'REIT - Specialty',
    price: 185.20,
    change: 2.85,
    changePercent: 1.56,
    marketCap: 62000000000,
    peRatio: 125.8,
    forwardPE: 85.4,
    pegRatio: 4.2,
    priceToBook: 2.4,
    priceToSales: 11.5,
    eps: 1.47,
    epsGrowth: -45.2,
    revenue: 5400000000,
    revenueGrowth: 8.5,
    grossMargin: 52.4,
    operatingMargin: 15.2,
    netMargin: 8.5,
    roe: 1.9,
    roa: 0.8,
    debtToEquity: 98.5,
    currentRatio: 0.85,
    dividendYield: 2.65,
    payoutRatio: 332.5,
    beta: 0.72,
    fiftyTwoWeekHigh: 195.50,
    fiftyTwoWeekLow: 125.80,
    averageVolume: 1800000,
  },
  VRT: {
    symbol: 'VRT',
    companyName: 'Vertiv Holdings Co',
    sector: 'Industrials',
    industry: 'Electrical Equipment & Parts',
    price: 125.85,
    change: 4.52,
    changePercent: 3.72,
    marketCap: 47000000000,
    peRatio: 58.2,
    forwardPE: 35.4,
    pegRatio: 1.4,
    priceToBook: 18.5,
    priceToSales: 6.2,
    eps: 2.16,
    epsGrowth: 142.5,
    revenue: 7600000000,
    revenueGrowth: 18.2,
    grossMargin: 35.8,
    operatingMargin: 15.4,
    netMargin: 10.8,
    roe: 42.5,
    roa: 8.5,
    debtToEquity: 185.2,
    currentRatio: 1.52,
    dividendYield: 0.08,
    payoutRatio: 4.5,
    beta: 1.45,
    fiftyTwoWeekHigh: 142.50,
    fiftyTwoWeekLow: 42.80,
    averageVolume: 5500000,
  },
  SMCI: {
    symbol: 'SMCI',
    companyName: 'Super Micro Computer, Inc.',
    sector: 'Technology',
    industry: 'Computer Hardware',
    price: 42.50,
    change: -1.85,
    changePercent: -4.17,
    marketCap: 25000000000,
    peRatio: 15.2,
    forwardPE: 12.8,
    pegRatio: 0.4,
    priceToBook: 4.8,
    priceToSales: 1.2,
    eps: 2.80,
    epsGrowth: 85.4,
    revenue: 21000000000,
    revenueGrowth: 145.2,
    grossMargin: 14.2,
    operatingMargin: 8.5,
    netMargin: 6.8,
    roe: 38.5,
    roa: 12.4,
    debtToEquity: 42.5,
    currentRatio: 2.15,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 1.85,
    fiftyTwoWeekHigh: 122.90,
    fiftyTwoWeekLow: 17.25,
    averageVolume: 28000000,
  },
  // Nuclear Stocks
  CEG: {
    symbol: 'CEG',
    companyName: 'Constellation Energy Corporation',
    sector: 'Utilities',
    industry: 'Utilities - Renewable',
    price: 285.45,
    change: 8.52,
    changePercent: 3.08,
    marketCap: 90000000000,
    peRatio: 32.5,
    forwardPE: 25.8,
    pegRatio: 1.8,
    priceToBook: 5.2,
    priceToSales: 3.8,
    eps: 8.78,
    epsGrowth: 95.2,
    revenue: 24000000000,
    revenueGrowth: 12.5,
    grossMargin: 28.5,
    operatingMargin: 18.2,
    netMargin: 11.5,
    roe: 18.4,
    roa: 5.2,
    debtToEquity: 85.4,
    currentRatio: 1.25,
    dividendYield: 0.52,
    payoutRatio: 16.8,
    beta: 1.12,
    fiftyTwoWeekHigh: 325.00,
    fiftyTwoWeekLow: 142.50,
    averageVolume: 3200000,
  },
  VST: {
    symbol: 'VST',
    companyName: 'Vistra Corp.',
    sector: 'Utilities',
    industry: 'Utilities - Independent Power Producers',
    price: 175.80,
    change: 5.25,
    changePercent: 3.08,
    marketCap: 58000000000,
    peRatio: 18.5,
    forwardPE: 14.2,
    pegRatio: 0.8,
    priceToBook: 8.5,
    priceToSales: 3.5,
    eps: 9.50,
    epsGrowth: 285.4,
    revenue: 16500000000,
    revenueGrowth: 8.2,
    grossMargin: 32.5,
    operatingMargin: 22.4,
    netMargin: 18.8,
    roe: 52.5,
    roa: 8.2,
    debtToEquity: 245.8,
    currentRatio: 0.95,
    dividendYield: 0.48,
    payoutRatio: 8.8,
    beta: 1.28,
    fiftyTwoWeekHigh: 195.50,
    fiftyTwoWeekLow: 52.80,
    averageVolume: 4500000,
  },
  CCJ: {
    symbol: 'CCJ',
    companyName: 'Cameco Corporation',
    sector: 'Energy',
    industry: 'Uranium',
    price: 58.25,
    change: 1.45,
    changePercent: 2.55,
    marketCap: 25000000000,
    peRatio: 125.5,
    forwardPE: 42.8,
    pegRatio: 2.5,
    priceToBook: 3.8,
    priceToSales: 9.2,
    eps: 0.46,
    epsGrowth: 185.2,
    revenue: 2700000000,
    revenueGrowth: 35.8,
    grossMargin: 28.5,
    operatingMargin: 15.2,
    netMargin: 7.5,
    roe: 3.2,
    roa: 1.8,
    debtToEquity: 28.5,
    currentRatio: 3.45,
    dividendYield: 0.22,
    payoutRatio: 27.5,
    beta: 1.52,
    fiftyTwoWeekHigh: 65.80,
    fiftyTwoWeekLow: 38.50,
    averageVolume: 5800000,
  },
  SMR: {
    symbol: 'SMR',
    companyName: 'NuScale Power Corporation',
    sector: 'Industrials',
    industry: 'Specialty Industrial Machinery',
    price: 28.50,
    change: 1.25,
    changePercent: 4.59,
    marketCap: 7200000000,
    peRatio: -18.5,
    forwardPE: -25.2,
    pegRatio: 0,
    priceToBook: 15.8,
    priceToSales: 285.4,
    eps: -1.54,
    epsGrowth: 0,
    revenue: 25000000,
    revenueGrowth: 45.2,
    grossMargin: 0,
    operatingMargin: -520.5,
    netMargin: -545.8,
    roe: -45.2,
    roa: -18.5,
    debtToEquity: 15.8,
    currentRatio: 8.52,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 2.45,
    fiftyTwoWeekHigh: 35.50,
    fiftyTwoWeekLow: 8.50,
    averageVolume: 15000000,
  },
  OKLO: {
    symbol: 'OKLO',
    companyName: 'Oklo Inc.',
    sector: 'Industrials',
    industry: 'Specialty Industrial Machinery',
    price: 42.85,
    change: 2.15,
    changePercent: 5.28,
    marketCap: 5200000000,
    peRatio: -28.5,
    forwardPE: -35.2,
    pegRatio: 0,
    priceToBook: 22.5,
    priceToSales: 0,
    eps: -1.50,
    epsGrowth: 0,
    revenue: 0,
    revenueGrowth: 0,
    grossMargin: 0,
    operatingMargin: 0,
    netMargin: 0,
    roe: -25.8,
    roa: -12.5,
    debtToEquity: 0,
    currentRatio: 15.85,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 2.85,
    fiftyTwoWeekHigh: 52.50,
    fiftyTwoWeekLow: 8.20,
    averageVolume: 8500000,
  },
  NNE: {
    symbol: 'NNE',
    companyName: 'Nano Nuclear Energy Inc.',
    sector: 'Industrials',
    industry: 'Specialty Industrial Machinery',
    price: 38.50,
    change: 2.85,
    changePercent: 8.00,
    marketCap: 1500000000,
    peRatio: -12.8,
    forwardPE: -18.5,
    pegRatio: 0,
    priceToBook: 18.5,
    priceToSales: 0,
    eps: -3.01,
    epsGrowth: 0,
    revenue: 0,
    revenueGrowth: 0,
    grossMargin: 0,
    operatingMargin: 0,
    netMargin: 0,
    roe: -35.2,
    roa: -22.5,
    debtToEquity: 0,
    currentRatio: 12.45,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 3.25,
    fiftyTwoWeekHigh: 48.50,
    fiftyTwoWeekLow: 5.80,
    averageVolume: 4500000,
  },
  // Ride-sharing & Mobility
  UBER: {
    symbol: 'UBER',
    companyName: 'Uber Technologies, Inc.',
    sector: 'Technology',
    industry: 'Software - Application',
    price: 82.14,
    change: 1.52,
    changePercent: 1.89,
    marketCap: 172000000000,
    peRatio: 48.3,
    forwardPE: 32.1,
    pegRatio: 1.6,
    priceToBook: 12.4,
    priceToSales: 3.8,
    eps: 1.70,
    epsGrowth: 312.5,
    revenue: 45000000000,
    revenueGrowth: 16.2,
    grossMargin: 39.5,
    operatingMargin: 6.2,
    netMargin: 8.5,
    roe: 28.4,
    roa: 5.8,
    debtToEquity: 85.2,
    currentRatio: 1.22,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 1.48,
    fiftyTwoWeekHigh: 87.00,
    fiftyTwoWeekLow: 56.12,
    averageVolume: 18000000,
  },
  LYFT: {
    symbol: 'LYFT',
    companyName: 'Lyft, Inc.',
    sector: 'Technology',
    industry: 'Software - Application',
    price: 14.85,
    change: 0.32,
    changePercent: 2.20,
    marketCap: 5800000000,
    peRatio: -24.5,
    forwardPE: 38.2,
    pegRatio: 0,
    priceToBook: 4.8,
    priceToSales: 1.4,
    eps: -0.61,
    epsGrowth: 72.5,
    revenue: 4100000000,
    revenueGrowth: 8.5,
    grossMargin: 29.8,
    operatingMargin: -4.2,
    netMargin: -5.8,
    roe: -22.5,
    roa: -5.2,
    debtToEquity: 52.8,
    currentRatio: 0.88,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 1.85,
    fiftyTwoWeekHigh: 21.60,
    fiftyTwoWeekLow: 9.82,
    averageVolume: 7500000,
  },
  // Big Tech
  GOOGL: {
    symbol: 'GOOGL',
    companyName: 'Alphabet Inc. (Class A)',
    sector: 'Communication Services',
    industry: 'Internet Content & Information',
    price: 178.52,
    change: 2.18,
    changePercent: 1.24,
    marketCap: 2200000000000,
    peRatio: 22.8,
    forwardPE: 19.5,
    pegRatio: 1.2,
    priceToBook: 6.8,
    priceToSales: 6.2,
    eps: 7.83,
    epsGrowth: 31.4,
    revenue: 355000000000,
    revenueGrowth: 14.2,
    grossMargin: 56.9,
    operatingMargin: 28.5,
    netMargin: 23.8,
    roe: 31.5,
    roa: 17.2,
    debtToEquity: 12.4,
    currentRatio: 2.10,
    dividendYield: 0.48,
    payoutRatio: 10.8,
    beta: 1.05,
    fiftyTwoWeekHigh: 191.75,
    fiftyTwoWeekLow: 140.53,
    averageVolume: 24000000,
  },
  GOOG: {
    symbol: 'GOOG',
    companyName: 'Alphabet Inc. (Class C)',
    sector: 'Communication Services',
    industry: 'Internet Content & Information',
    price: 179.85,
    change: 2.24,
    changePercent: 1.26,
    marketCap: 2200000000000,
    peRatio: 22.9,
    forwardPE: 19.6,
    pegRatio: 1.2,
    priceToBook: 6.9,
    priceToSales: 6.2,
    eps: 7.83,
    epsGrowth: 31.4,
    revenue: 355000000000,
    revenueGrowth: 14.2,
    grossMargin: 56.9,
    operatingMargin: 28.5,
    netMargin: 23.8,
    roe: 31.5,
    roa: 17.2,
    debtToEquity: 12.4,
    currentRatio: 2.10,
    dividendYield: 0.48,
    payoutRatio: 10.8,
    beta: 1.05,
    fiftyTwoWeekHigh: 192.30,
    fiftyTwoWeekLow: 141.10,
    averageVolume: 18000000,
  },
  AMZN: {
    symbol: 'AMZN',
    companyName: 'Amazon.com, Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Internet Retail',
    price: 198.75,
    change: 3.42,
    changePercent: 1.75,
    marketCap: 2100000000000,
    peRatio: 42.5,
    forwardPE: 34.2,
    pegRatio: 1.8,
    priceToBook: 9.5,
    priceToSales: 3.5,
    eps: 4.68,
    epsGrowth: 95.2,
    revenue: 600000000000,
    revenueGrowth: 10.5,
    grossMargin: 47.6,
    operatingMargin: 10.8,
    netMargin: 8.4,
    roe: 22.8,
    roa: 7.5,
    debtToEquity: 52.1,
    currentRatio: 1.05,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 1.15,
    fiftyTwoWeekHigh: 215.90,
    fiftyTwoWeekLow: 151.61,
    averageVolume: 42000000,
  },
  META: {
    symbol: 'META',
    companyName: 'Meta Platforms, Inc.',
    sector: 'Communication Services',
    industry: 'Internet Content & Information',
    price: 585.20,
    change: 8.45,
    changePercent: 1.46,
    marketCap: 1490000000000,
    peRatio: 26.8,
    forwardPE: 22.4,
    pegRatio: 1.1,
    priceToBook: 9.5,
    priceToSales: 9.2,
    eps: 21.83,
    epsGrowth: 73.2,
    revenue: 162000000000,
    revenueGrowth: 21.5,
    grossMargin: 81.5,
    operatingMargin: 41.8,
    netMargin: 38.2,
    roe: 38.5,
    roa: 19.8,
    debtToEquity: 28.4,
    currentRatio: 2.65,
    dividendYield: 0.35,
    payoutRatio: 9.2,
    beta: 1.22,
    fiftyTwoWeekHigh: 638.40,
    fiftyTwoWeekLow: 414.50,
    averageVolume: 15000000,
  },
  // Enterprise & Cloud
  PLTR: {
    symbol: 'PLTR',
    companyName: 'Palantir Technologies Inc.',
    sector: 'Technology',
    industry: 'Software - Infrastructure',
    price: 38.52,
    change: 1.25,
    changePercent: 3.36,
    marketCap: 82000000000,
    peRatio: 185.2,
    forwardPE: 68.5,
    pegRatio: 4.8,
    priceToBook: 18.5,
    priceToSales: 22.4,
    eps: 0.21,
    epsGrowth: 162.5,
    revenue: 3600000000,
    revenueGrowth: 27.2,
    grossMargin: 80.5,
    operatingMargin: 8.5,
    netMargin: 15.2,
    roe: 10.5,
    roa: 7.8,
    debtToEquity: 0,
    currentRatio: 5.85,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 2.52,
    fiftyTwoWeekHigh: 45.00,
    fiftyTwoWeekLow: 16.02,
    averageVolume: 82000000,
  },
  SNOW: {
    symbol: 'SNOW',
    companyName: 'Snowflake Inc.',
    sector: 'Technology',
    industry: 'Software - Application',
    price: 148.50,
    change: 3.25,
    changePercent: 2.24,
    marketCap: 48000000000,
    peRatio: -62.5,
    forwardPE: 85.2,
    pegRatio: 0,
    priceToBook: 8.5,
    priceToSales: 13.8,
    eps: -2.38,
    epsGrowth: 48.5,
    revenue: 3600000000,
    revenueGrowth: 29.5,
    grossMargin: 67.2,
    operatingMargin: -18.5,
    netMargin: -22.4,
    roe: -18.2,
    roa: -8.5,
    debtToEquity: 8.5,
    currentRatio: 2.85,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 1.85,
    fiftyTwoWeekHigh: 185.50,
    fiftyTwoWeekLow: 107.13,
    averageVolume: 6500000,
  },
  // Semiconductors
  AMD: {
    symbol: 'AMD',
    companyName: 'Advanced Micro Devices, Inc.',
    sector: 'Technology',
    industry: 'Semiconductors',
    price: 142.85,
    change: 4.18,
    changePercent: 3.01,
    marketCap: 231000000000,
    peRatio: 98.5,
    forwardPE: 28.4,
    pegRatio: 1.5,
    priceToBook: 4.8,
    priceToSales: 9.8,
    eps: 1.45,
    epsGrowth: 22.5,
    revenue: 24000000000,
    revenueGrowth: 8.2,
    grossMargin: 50.8,
    operatingMargin: 4.5,
    netMargin: 5.2,
    roe: 4.8,
    roa: 2.8,
    debtToEquity: 6.5,
    currentRatio: 2.82,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 1.72,
    fiftyTwoWeekHigh: 227.30,
    fiftyTwoWeekLow: 117.37,
    averageVolume: 52000000,
  },
  // Fintech & Crypto
  COIN: {
    symbol: 'COIN',
    companyName: 'Coinbase Global, Inc.',
    sector: 'Financial Services',
    industry: 'Capital Markets',
    price: 258.40,
    change: 12.85,
    changePercent: 5.23,
    marketCap: 63000000000,
    peRatio: 42.5,
    forwardPE: 28.5,
    pegRatio: 0.8,
    priceToBook: 6.8,
    priceToSales: 12.5,
    eps: 6.08,
    epsGrowth: 345.2,
    revenue: 5000000000,
    revenueGrowth: 78.5,
    grossMargin: 85.4,
    operatingMargin: 22.5,
    netMargin: 24.8,
    roe: 18.2,
    roa: 8.5,
    debtToEquity: 55.2,
    currentRatio: 1.92,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 3.25,
    fiftyTwoWeekHigh: 349.75,
    fiftyTwoWeekLow: 130.00,
    averageVolume: 12000000,
  },
  // E-Commerce
  SHOP: {
    symbol: 'SHOP',
    companyName: 'Shopify Inc.',
    sector: 'Technology',
    industry: 'Software - Application',
    price: 92.45,
    change: 2.15,
    changePercent: 2.38,
    marketCap: 118000000000,
    peRatio: 72.5,
    forwardPE: 52.8,
    pegRatio: 2.4,
    priceToBook: 12.5,
    priceToSales: 14.2,
    eps: 1.28,
    epsGrowth: 185.4,
    revenue: 8400000000,
    revenueGrowth: 23.5,
    grossMargin: 51.2,
    operatingMargin: 8.5,
    netMargin: 12.5,
    roe: 18.5,
    roa: 8.2,
    debtToEquity: 18.5,
    currentRatio: 4.25,
    dividendYield: 0,
    payoutRatio: 0,
    beta: 1.95,
    fiftyTwoWeekHigh: 115.00,
    fiftyTwoWeekLow: 60.85,
    averageVolume: 9800000,
  },
};

export function getStockData(symbol: string): StockFundamentals | null {
  const upperSymbol = symbol.toUpperCase().trim();
  const stock = mockStocks[upperSymbol];
  
  if (stock && !stock.technicals) {
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
  
  return stock || null;
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
  // Research consensus: below 60% confidence the signal is noise.
  // A low-conviction "buy" or "sell" is more dangerous than a "hold".
  // Override to hold when the model isn't sure enough to take a directional view.
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
