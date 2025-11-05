/** USD 통화 포매터 */
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** USD 통화 형식으로 포맷 */
export const formatCurrency = (value: number): string => {
  if (isNaN(value)) return '$0.00';
  return currencyFormatter.format(value);
};

/** 퍼센트 형식으로 포맷 (+/- 부호 포함) */
export const formatPercent = (value: number): string => {
  if (isNaN(value)) return '0.00%';

  const sign = value >= 0 ? '+' : '';
  const formatted = Math.abs(value).toFixed(2);

  return `${sign}${value >= 0 ? formatted : `-${formatted}`}%`;
};

/** 큰 숫자를 K, M, B 단위로 축약 */
export const formatCompact = (value: number): string => {
  if (isNaN(value)) return '$0';

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1e9) {
    return `${sign}$${(absValue / 1e9).toFixed(2)}B`;
  }
  if (absValue >= 1e6) {
    return `${sign}$${(absValue / 1e6).toFixed(2)}M`;
  }
  if (absValue >= 1e3) {
    return `${sign}$${(absValue / 1e3).toFixed(2)}K`;
  }

  return formatCurrency(value);
};
