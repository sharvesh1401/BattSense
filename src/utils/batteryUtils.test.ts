import { getSoHStatus } from './batteryUtils';

describe('getSoHStatus', () => {
  // Test cases for "Excellent" status
  it('should return "Excellent" for SOH >= 0.9', () => {
    expect(getSoHStatus(1.0).status).toBe('Excellent');
    expect(getSoHStatus(0.95).status).toBe('Excellent');
    expect(getSoHStatus(0.9).status).toBe('Excellent');
  });

  it('should return correct color and bg for "Excellent"', () => {
    const result = getSoHStatus(0.9);
    expect(result.color).toBe('text-green-600');
    expect(result.bg).toBe('bg-green-50');
  });

  // Test cases for "Good" status
  it('should return "Good" for SOH between 0.7 and 0.89 (inclusive of 0.7, exclusive of 0.9)', () => {
    expect(getSoHStatus(0.89).status).toBe('Good');
    expect(getSoHStatus(0.8).status).toBe('Good');
    expect(getSoHStatus(0.7).status).toBe('Good');
  });

  it('should return correct color and bg for "Good"', () => {
    const result = getSoHStatus(0.75);
    expect(result.color).toBe('text-yellow-600');
    expect(result.bg).toBe('bg-yellow-50');
  });

  // Test cases for "Degraded" status
  it('should return "Degraded" for SOH between 0.5 and 0.69 (inclusive of 0.5, exclusive of 0.7)', () => {
    expect(getSoHStatus(0.69).status).toBe('Degraded');
    expect(getSoHStatus(0.6).status).toBe('Degraded');
    expect(getSoHStatus(0.5).status).toBe('Degraded');
  });

  it('should return correct color and bg for "Degraded"', () => {
    const result = getSoHStatus(0.55);
    expect(result.color).toBe('text-orange-600');
    expect(result.bg).toBe('bg-orange-50');
  });

  // Test cases for "Needs Replacement" status
  it('should return "Needs Replacement" for SOH < 0.5', () => {
    expect(getSoHStatus(0.49).status).toBe('Needs Replacement');
    expect(getSoHStatus(0.25).status).toBe('Needs Replacement');
    expect(getSoHStatus(0.0).status).toBe('Needs Replacement');
    expect(getSoHStatus(-0.1).status).toBe('Needs Replacement'); // Edge case for negative values
  });

  it('should return correct color and bg for "Needs Replacement"', () => {
    const result = getSoHStatus(0.4);
    expect(result.color).toBe('text-red-600');
    expect(result.bg).toBe('bg-red-50');
  });
});
