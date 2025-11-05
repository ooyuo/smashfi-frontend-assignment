import { SortDirection } from '@/shared/types/sort';
import { stableSort, compareBy } from '@/shared/utils/sort';
import { Coin } from '../../api';

/** Coin 정렬 키 매핑 */
export const COIN_SORT_KEY_MAP = {
  currentPrice: 'current_price',
  priceChange24hPct: 'price_change_percentage_24h',
  volume24h: 'total_volume',
  marketCap: 'market_cap',
} as const;

export type CoinSortKey = keyof typeof COIN_SORT_KEY_MAP;

/**
 * 코인 목록을 지정된 키로 정렬
 * @param coins - 정렬할 코인 배열
 * @param sortKey - 정렬 기준 키
 * @param direction - 정렬 방향
 * @returns 정렬된 새 배열
 */
export const sortCoinsByKey = (
  coins: Coin[],
  sortKey: CoinSortKey,
  direction: SortDirection
): Coin[] => {
  const actualKey = COIN_SORT_KEY_MAP[sortKey] as keyof Coin;
  return stableSort(coins, compareBy(actualKey, direction));
};
