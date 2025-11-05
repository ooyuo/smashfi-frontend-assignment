import { apiClient } from '@/shared/api';
import type { Coin, CoinListItem, FetchCoinsParams } from './types';

const DEFAULT_PARAMS = {
  vs_currency: 'usd',
  per_page: 100,
  order: 'market_cap_desc',
  sparkline: false,
  price_change_percentage: '24h',
} as const;

export const coinApi = {
  /** 전체 코인 리스트 조회 (검색용) */
  getCoinList: async (): Promise<CoinListItem[]> => {
    const { data } = await apiClient.get<CoinListItem[]>('/coins/list');
    return data;
  },

  /** 코인 목록 조회 */
  getCoins: async (params: FetchCoinsParams = {}): Promise<Coin[]> => {
    const { data } = await apiClient.get<Coin[]>('/coins/markets', {
      params: {
        ...DEFAULT_PARAMS,
        page: params.page || 1,
        ...(params.vsCurrency && { vs_currency: params.vsCurrency }),
        ...(params.perPage && { per_page: params.perPage }),
        ...(params.order && { order: params.order }),
        ...(params.ids && { ids: params.ids }),
      },
    });

    return data;
  },
};
