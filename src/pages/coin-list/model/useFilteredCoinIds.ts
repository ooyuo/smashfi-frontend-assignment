import { useMemo } from 'react';
import { CoinListItem } from '@/entities/coin/api/types';

interface Params {
  coinList: CoinListItem[];
  searchQuery: string;
  showOnlyFavorites: boolean;
  favoriteIds: Set<string>;
}

/**
 * 검색/즐겨찾기 필터링된 코인 IDs 반환
 * - 전체 코인 목록에서 검색어/즐겨찾기로 필터링
 * - 서버 요청용 IDs 문자열 생성 ("bitcoin,ethereum,...")
 *
 * @returns undefined (필터 없음) | 'no-results' (결과 없음) | 'id1,id2,...' (필터링된 IDs)
 */
export const useFilteredCoinIds = ({
  coinList,
  searchQuery,
  showOnlyFavorites,
  favoriteIds,
}: Params) => {
  return useMemo(() => {
    const hasSearch = searchQuery.trim() !== '';
    if (!hasSearch && !showOnlyFavorites) return undefined;

    const lower = searchQuery.toLowerCase();
    const filtered = coinList
      .filter((coin) => {
        const matchesSearch =
          !hasSearch ||
          coin.id.toLowerCase().includes(lower) ||
          coin.symbol.toLowerCase().includes(lower) ||
          coin.name.toLowerCase().includes(lower);
        const matchesFavorite = !showOnlyFavorites || favoriteIds.has(coin.id);
        return matchesSearch && matchesFavorite;
      })
      .map((c) => c.id)
      .slice(0, 250);

    return filtered.length > 0 ? filtered.join(',') : 'no-results';
  }, [coinList, searchQuery, showOnlyFavorites, favoriteIds]);
};
