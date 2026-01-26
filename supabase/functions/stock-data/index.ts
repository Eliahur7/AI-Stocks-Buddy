import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FMPQuote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  volume: number;
  avgVolume: number;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  sharesOutstanding: number;
}

interface FMPProfile {
  symbol: string;
  companyName: string;
  sector: string;
  industry: string;
  beta: number;
}

interface FMPRatios {
  peRatioTTM: number;
  pegRatioTTM: number;
  priceToBookRatioTTM: number;
  priceToSalesRatioTTM: number;
  dividendYieldTTM: number;
  payoutRatioTTM: number;
  currentRatioTTM: number;
  debtEquityRatioTTM: number;
  returnOnEquityTTM: number;
  returnOnAssetsTTM: number;
  grossProfitMarginTTM: number;
  operatingProfitMarginTTM: number;
  netProfitMarginTTM: number;
}

interface FMPGrowth {
  revenueGrowth: number;
  epsgrowth: number;
}

interface FMPIncomeStatement {
  revenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const symbol = url.searchParams.get('symbol')?.toUpperCase();

    if (!symbol || !/^[A-Z]{1,5}$/.test(symbol)) {
      return new Response(
        JSON.stringify({ error: 'Invalid ticker symbol. Use 1-5 uppercase letters.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FMP_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const baseUrl = 'https://financialmodelingprep.com/api/v3';

    // Fetch all data in parallel
    const [quoteRes, profileRes, ratiosRes, growthRes, incomeRes] = await Promise.all([
      fetch(`${baseUrl}/quote/${symbol}?apikey=${apiKey}`),
      fetch(`${baseUrl}/profile/${symbol}?apikey=${apiKey}`),
      fetch(`${baseUrl}/ratios-ttm/${symbol}?apikey=${apiKey}`),
      fetch(`${baseUrl}/financial-growth/${symbol}?limit=1&apikey=${apiKey}`),
      fetch(`${baseUrl}/income-statement/${symbol}?limit=1&apikey=${apiKey}`),
    ]);

    const [quoteData, profileData, ratiosData, growthData, incomeData] = await Promise.all([
      quoteRes.json() as Promise<FMPQuote[]>,
      profileRes.json() as Promise<FMPProfile[]>,
      ratiosRes.json() as Promise<FMPRatios[]>,
      growthRes.json() as Promise<FMPGrowth[]>,
      incomeRes.json() as Promise<FMPIncomeStatement[]>,
    ]);

    if (!quoteData?.length || !profileData?.length) {
      return new Response(
        JSON.stringify({ error: `No data found for ticker "${symbol}"` }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const quote = quoteData[0];
    const profile = profileData[0];
    const ratios = ratiosData?.[0] || {};
    const growth = growthData?.[0] || {};
    const income = incomeData?.[0] || {};

    // Build standardized response
    const stockData = {
      symbol: quote.symbol,
      companyName: profile.companyName || quote.name,
      sector: profile.sector || 'N/A',
      industry: profile.industry || 'N/A',
      price: quote.price || 0,
      change: quote.change || 0,
      changePercent: quote.changesPercentage || 0,
      marketCap: quote.marketCap || 0,
      peRatio: quote.pe || ratios.peRatioTTM || 0,
      forwardPE: ratios.peRatioTTM || quote.pe || 0,
      pegRatio: ratios.pegRatioTTM || 0,
      priceToBook: ratios.priceToBookRatioTTM || 0,
      priceToSales: ratios.priceToSalesRatioTTM || 0,
      eps: quote.eps || 0,
      epsGrowth: (growth.epsgrowth || 0) * 100,
      revenue: income.revenue || 0,
      revenueGrowth: (growth.revenueGrowth || 0) * 100,
      grossMargin: (ratios.grossProfitMarginTTM || 0) * 100,
      operatingMargin: (ratios.operatingProfitMarginTTM || 0) * 100,
      netMargin: (ratios.netProfitMarginTTM || 0) * 100,
      roe: (ratios.returnOnEquityTTM || 0) * 100,
      roa: (ratios.returnOnAssetsTTM || 0) * 100,
      debtToEquity: ratios.debtEquityRatioTTM || 0,
      currentRatio: ratios.currentRatioTTM || 0,
      dividendYield: (ratios.dividendYieldTTM || 0) * 100,
      payoutRatio: (ratios.payoutRatioTTM || 0) * 100,
      beta: profile.beta || 1,
      fiftyTwoWeekHigh: quote.yearHigh || 0,
      fiftyTwoWeekLow: quote.yearLow || 0,
      averageVolume: quote.avgVolume || 0,
    };

    return new Response(
      JSON.stringify(stockData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch stock data' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
