/** Coin 관련 Query Key Factory */
export const COIN_QUERY_KEYS = {
  all: ['coins'] as const,
  list: () => [...COIN_QUERY_KEYS.all, 'list'] as const,
  infinite: (params?: Record<string, unknown>) =>
    [...COIN_QUERY_KEYS.all, 'infinite', params] as const,
  search: (params?: Record<string, unknown>) => [...COIN_QUERY_KEYS.all, 'search', params] as const,
} as const;
