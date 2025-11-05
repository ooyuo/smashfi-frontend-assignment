import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { coinApi, FetchCoinsParams, Coin } from '../../api';
import { COIN_QUERY_KEYS } from '../lib/queryKeys';
import { COIN_LIST_QUERY_OPTIONS } from '@/shared/config/query';

interface UseCoinsParams extends Omit<FetchCoinsParams, 'page'> {
  searchMode?: boolean;
}

interface UseCoinsReturn {
  coins: Coin[];
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

/**
 * 코인 목록 조회 훅
 * - 검색 모드: 단일 쿼리
 * - 일반 모드: 무한 스크롤
 */
export const useCoins = (params?: UseCoinsParams): UseCoinsReturn => {
  const { searchMode = false, ...apiParams } = params || {};

  const searchQuery = useQuery({
    queryKey: COIN_QUERY_KEYS.search(apiParams),
    queryFn: () => coinApi.getCoins(apiParams),
    enabled: searchMode,
    ...COIN_LIST_QUERY_OPTIONS,
  });

  const infiniteQuery = useInfiniteQuery({
    queryKey: COIN_QUERY_KEYS.infinite(apiParams),
    queryFn: ({ pageParam }) => coinApi.getCoins({ ...apiParams, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => (lastPage?.length ? allPages.length + 1 : undefined),
    initialPageParam: 1,
    enabled: !searchMode,
    ...COIN_LIST_QUERY_OPTIONS,
  });

  if (searchMode) {
    return {
      coins: searchQuery.data ?? [],
      isLoading: searchQuery.isLoading,
      fetchNextPage: () => {},
      hasNextPage: false,
      isFetchingNextPage: false,
    };
  }

  return {
    coins: infiniteQuery.data?.pages.flatMap((page) => page) ?? [],
    isLoading: infiniteQuery.isLoading,
    fetchNextPage: infiniteQuery.fetchNextPage,
    hasNextPage: infiniteQuery.hasNextPage ?? false,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
  };
};
