import { memo } from 'react';
import { SortKey, SORT_KEYS } from '@/features/coin-list/model/constants';
import { SortDirection } from '@/shared/types/sort';
import { SortIndicator } from '@/features/coin-list/ui';
import { TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { cn } from '@/shared/lib/utils';

interface CoinHeaderProps {
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

export const CoinHeader = memo(({ sortKey, sortDirection, onSort }: CoinHeaderProps) => {
  const isActivePrice = sortKey === SORT_KEYS.PRICE;
  const isActiveChange = sortKey === SORT_KEYS.CHANGE_24H;
  const isActiveVolume = sortKey === SORT_KEYS.VOLUME_24H;
  const isActiveMarketCap = sortKey === SORT_KEYS.MARKET_CAP;

  const handleKeyDown = (key: SortKey) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSort(key);
    }
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[80px] text-center">Favorite</TableHead>
        <TableHead className="w-[250px]">Name</TableHead>
        <TableHead
          className={cn(
            'cursor-pointer select-none hover:bg-muted/50 transition-colors',
            isActivePrice && 'bg-muted/50'
          )}
          onClick={() => onSort(SORT_KEYS.PRICE)}
          onKeyDown={handleKeyDown(SORT_KEYS.PRICE)}
          tabIndex={0}
          role="button"
          aria-label="정렬: 가격"
        >
          <div className="flex items-center">
            Price
            <SortIndicator isActive={isActivePrice} direction={sortDirection} />
          </div>
        </TableHead>
        <TableHead
          className={cn(
            'cursor-pointer select-none hover:bg-muted/50 transition-colors',
            isActiveChange && 'bg-muted/50'
          )}
          onClick={() => onSort(SORT_KEYS.CHANGE_24H)}
          onKeyDown={handleKeyDown(SORT_KEYS.CHANGE_24H)}
          tabIndex={0}
          role="button"
          aria-label="정렬: 24시간 변동률"
        >
          <div className="flex items-center">
            24h Change
            <SortIndicator isActive={isActiveChange} direction={sortDirection} />
          </div>
        </TableHead>
        <TableHead
          className={cn(
            'cursor-pointer select-none hover:bg-muted/50 transition-colors',
            isActiveVolume && 'bg-muted/50'
          )}
          onClick={() => onSort(SORT_KEYS.VOLUME_24H)}
          onKeyDown={handleKeyDown(SORT_KEYS.VOLUME_24H)}
          tabIndex={0}
          role="button"
          aria-label="정렬: 24시간 거래량"
        >
          <div className="flex items-center">
            24h Volume
            <SortIndicator isActive={isActiveVolume} direction={sortDirection} />
          </div>
        </TableHead>
        <TableHead
          className={cn(
            'cursor-pointer select-none hover:bg-muted/50 transition-colors',
            isActiveMarketCap && 'bg-muted/50'
          )}
          onClick={() => onSort(SORT_KEYS.MARKET_CAP)}
          onKeyDown={handleKeyDown(SORT_KEYS.MARKET_CAP)}
          tabIndex={0}
          role="button"
          aria-label="정렬: 시가총액"
        >
          <div className="flex items-center">
            Market Cap
            <SortIndicator isActive={isActiveMarketCap} direction={sortDirection} />
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
});

CoinHeader.displayName = 'CoinHeader';
