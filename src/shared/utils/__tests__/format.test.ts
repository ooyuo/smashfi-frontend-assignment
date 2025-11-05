import { describe, it, expect } from 'vitest';
import { formatCurrency, formatCompact, formatPercent } from '../format';

describe('format utils', () => {
  describe('formatCurrency', () => {
    it('소수점 2자리까지 표시한다', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('천 단위 구분자를 추가한다', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('음수 값도 포맷한다', () => {
      expect(formatCurrency(-100)).toBe('-$100.00');
    });

    it('소수점 2자리로 반올림한다', () => {
      expect(formatCurrency(0.001234)).toBe('$0.00');
    });
  });

  describe('formatCompact', () => {
    it('백만 단위를 M으로 표시한다', () => {
      expect(formatCompact(1500000)).toBe('$1.50M');
    });

    it('십억 단위를 B으로 표시한다', () => {
      expect(formatCompact(2500000000)).toBe('$2.50B');
    });

    it('조 단위는 B로 표시한다 (1e12 이상)', () => {
      expect(formatCompact(3500000000000)).toBe('$3500.00B');
    });

    it('천 단위를 K로 표시한다', () => {
      expect(formatCompact(123456)).toBe('$123.46K');
    });
  });

  describe('formatPercent', () => {
    it('양수 변화율을 올바르게 표시한다', () => {
      expect(formatPercent(5.234)).toBe('+5.23%');
    });

    it('음수 변화율을 올바르게 표시한다', () => {
      expect(formatPercent(-3.456)).toBe('-3.46%');
    });

    it('0을 올바르게 표시한다', () => {
      expect(formatPercent(0)).toBe('+0.00%');
    });

    it('소수점 2자리로 반올림한다', () => {
      expect(formatPercent(1.999)).toBe('+2.00%');
    });
  });
});
