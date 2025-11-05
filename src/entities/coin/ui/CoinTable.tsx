import { Coin } from '../api/types';
import { SortKey } from '@/features/coin-list/model/constants';
import { SortDirection } from '@/shared/types/sort';
import {
  VIRTUAL_ITEM_SIZE,
  VIRTUAL_SCROLL_HEIGHT,
  INFINITE_SCROLL_THRESHOLD,
  VIRTUAL_SCROLL_OVERSCAN,
} from '../model/lib/constants';
import { useVirtualList } from '@/shared/lib/hooks/useVirtualList';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { CoinHeader } from './CoinHeader';
import { CoinRow } from './CoinRow';
import { Empty } from './Empty';
import { Table, TableBody } from '@/shared/ui/table';
import { Card } from '@/shared/ui/card';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';

interface CoinTableProps {
  coins: Coin[];
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
  favoriteIds: Set<string>;
  onToggleFavorite: (id: string) => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
}

const NOOP = () => {};

const TABLE_STYLE = { tableLayout: 'fixed' as const, width: '100%' };

export const CoinTable = ({
  coins,
  sortKey,
  sortDirection,
  onSort,
  favoriteIds,
  onToggleFavorite,
  isLoading = false,
  hasNextPage = false,
  fetchNextPage,
  isFetchingNextPage = false,
}: CoinTableProps) => {
  const { parentRef, virtualizer, virtualItems, lastItemIndex } = useVirtualList({
    count: coins.length,
    estimateSize: VIRTUAL_ITEM_SIZE,
    overscan: VIRTUAL_SCROLL_OVERSCAN,
  });

  useInfiniteScroll({
    lastItemIndex,
    totalCount: coins.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage: fetchNextPage || NOOP,
    threshold: INFINITE_SCROLL_THRESHOLD,
  });

  if (isLoading) {
    return (
      <Card>
        <div className="py-12">
          <LoadingSpinner size="lg" message="Loading coins..." />
        </div>
      </Card>
    );
  }

  if (coins.length === 0) {
    return (
      <Card>
        <Empty message="No coins found" />
      </Card>
    );
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <div style={{ minWidth: '800px' }}>
          <Table style={TABLE_STYLE}>
            <CoinHeader sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} />
          </Table>
          <div
            ref={parentRef}
            style={{ height: `${VIRTUAL_SCROLL_HEIGHT}px` }}
            className="overflow-y-auto relative border-t"
          >
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {virtualItems.map((virtualRow) => {
                const coin = coins[virtualRow.index];
                const isFavorite = favoriteIds.has(coin.id);

                return (
                  <div
                    key={coin.id}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <Table style={TABLE_STYLE}>
                      <TableBody>
                        <CoinRow
                          coin={coin}
                          isFavorite={isFavorite}
                          onToggleFavorite={() => onToggleFavorite(coin.id)}
                        />
                      </TableBody>
                    </Table>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isFetchingNextPage && (
        <div className="py-4 border-t">
          <LoadingSpinner message="Loading more..." />
        </div>
      )}
    </Card>
  );
};
