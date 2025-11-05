import { SortKey } from '@/entities/coin/model';
import { SORT_DIRECTIONS } from '@/shared/types/sort';

/** Toast 메시지 */
export const TOAST_MESSAGES = {
  SUCCESS_ADD: 'Successfully added!',
  SUCCESS_DELETE: 'Successfully deleted!',
} as const;

/** 탭 타입 */
export const TAB_TYPES = {
  ALL: 'all',
  FAVORITES: 'favorites',
} as const;

export type TabType = (typeof TAB_TYPES)[keyof typeof TAB_TYPES];

/** 정렬 키 */
export const SORT_KEYS: Record<string, SortKey> = {
  PRICE: 'currentPrice',
  CHANGE_24H: 'priceChange24hPct',
  VOLUME_24H: 'volume24h',
  MARKET_CAP: 'marketCap',
} as const;

export type { SortKey };

/** 기본 정렬 설정 */
export const DEFAULT_SORT = {
  key: SORT_KEYS.PRICE,
  direction: SORT_DIRECTIONS.DESC,
} as const;
