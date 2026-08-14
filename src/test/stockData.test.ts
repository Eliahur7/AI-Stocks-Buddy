import { describe, it, expect } from 'vitest';
import { getStockData } from '../lib/stockData';

describe('Stock Data Accuracy & Dividend Safeguards', () => {
  it('should return 0.00% dividend yield and accurate data for ANET', () => {
    const data = getStockData('ANET');
    expect(data).not.toBeNull();
    expect(data?.symbol).toBe('ANET');
    expect(data?.companyName).toBe('Arista Networks, Inc.');
    expect(data?.dividendYield).toBe(0);
    expect(data?.payoutRatio).toBe(0);
    expect(data?.marketCap).toBe(125000000000);
    expect(data?.debtToEquity).toBe(0);
  });

  it('should not generate fake non-zero dividend yield for arbitrary fallback tickers', () => {
    const tickerA = getStockData('XYZ123');
    expect(tickerA?.dividendYield).toBe(0);
    expect(tickerA?.payoutRatio).toBe(0);

    const tickerB = getStockData('UNKNOWN');
    expect(tickerB?.dividendYield).toBe(0);
    expect(tickerB?.payoutRatio).toBe(0);
  });

  it('should correctly preserve dividend yield for known dividend-paying stocks', () => {
    const aapl = getStockData('AAPL');
    expect(aapl?.dividendYield).toBeGreaterThan(0);

    const jpm = getStockData('JPM');
    expect(jpm?.dividendYield).toBeGreaterThan(0);
  });

  it('should return accurate valuation and P/E ratios for AMD', () => {
    const data = getStockData('AMD');
    expect(data).not.toBeNull();
    expect(data?.symbol).toBe('AMD');
    expect(data?.companyName).toBe('Advanced Micro Devices, Inc.');
    expect(data?.peRatio).toBeCloseTo(127.2, 1);
    expect(data?.forwardPE).toBeCloseTo(63.3, 1);
    expect(data?.eps).toBe(1.12);
    expect(data?.dividendYield).toBe(0);
  });
});
