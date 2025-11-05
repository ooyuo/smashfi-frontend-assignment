import { useQuery } from '@tanstack/react-query';
import { coinApi, CoinListItem } from '../../api';
import { COIN_QUERY_KEYS } from '../lib/queryKeys';

/** 전체 코인 리스트 조회 */
export const useCoinList = () => {
  return useQuery<CoinListItem[], Error>({
    queryKey: COIN_QUERY_KEYS.list(),
    queryFn: () => coinApi.getCoinList(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
