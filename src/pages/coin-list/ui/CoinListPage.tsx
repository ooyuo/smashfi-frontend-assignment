import { useMemo } from 'react';
import { TAB_TYPES } from '@/features/coin-list/model/constants';
import { useFavorites, useTabs, useSearch, useSort } from '@/features/coin-list/model';
import { Tabs, SearchInput } from '@/features/coin-list/ui';
import { useCoins, useCoinList, sortCoinsByKey, CoinSortKey } from '@/entities/coin/model';
import { CoinTable } from '@/entities/coin/ui/CoinTable';
import { useFilteredCoinIds } from '../model/useFilteredCoinIds';

export const CoinListPage = () => {
  const { activeTab, setActiveTab } = useTabs();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { query, setQuery, debouncedQuery } = useSearch();
  const { sortKey, sortDirection, toggleSort } = useSort();

  const { data: coinList = [] } = useCoinList();
  const filteredIds = useFilteredCoinIds({
    coinList,
    searchQuery: debouncedQuery,
    showOnlyFavorites: activeTab === TAB_TYPES.FAVORITES,
    favoriteIds,
  });

  const { coins, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useCoins({
    searchMode: !!filteredIds,
    ids: filteredIds,
  });

  const displayCoins = useMemo(
    () => sortCoinsByKey(coins, sortKey as CoinSortKey, sortDirection),
    [coins, sortKey, sortDirection]
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Coin List</h1>
        <p className="text-muted-foreground">
          Track cryptocurrency prices, market cap, and trading volume
        </p>
      </header>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <SearchInput value={query} onChange={setQuery} />
      </div>

      <CoinTable
        coins={displayCoins}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={toggleSort}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        isLoading={isLoading}
        hasNextPage={!filteredIds && hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        Data provided by{' '}
        <a
          href="https://www.coingecko.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          CoinGecko
        </a>
      </footer>
    </div>
  );
};
