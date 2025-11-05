import { memo } from 'react';
import { Coin } from '../api/types';
import { formatCurrency, formatPercent, formatCompact } from '@/shared/utils/format';
import { FavoriteButton } from '@/features/coin-list/ui';
import { usePriceFlash } from '../model/hooks/usePriceFlash';
import { TableCell, TableRow } from '@/shared/ui/table';
import { cn } from '@/shared/lib/utils';

interface CoinRowProps {
  coin: Coin;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const FALLBACK_IMAGE = 'https://via.placeholder.com/32';

export const CoinRow = memo(({ coin, isFavorite, onToggleFavorite }: CoinRowProps) => {
  const isPositive = coin.price_change_percentage_24h >= 0;
  const priceFlash = usePriceFlash(coin.current_price);

  return (
    <TableRow
      className={cn(
        'transition-colors duration-500',
        isFavorite && 'bg-yellow-50/50 dark:bg-yellow-950/10'
      )}
    >
      <TableCell className="w-[80px] text-center">
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </TableCell>
      <TableCell className="w-[250px]">
        <div className="flex items-center gap-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="h-8 w-8 rounded-full"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
          <div className="flex flex-col">
            <span className="font-medium">{coin.symbol.toUpperCase()}</span>
            <span className="text-sm text-muted-foreground">{coin.name}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-medium">{formatCurrency(coin.current_price)}</TableCell>
      <TableCell
        className={cn(
          'transition-colors duration-500',
          priceFlash === 'up' && 'bg-red-100/50 dark:bg-red-900/30',
          priceFlash === 'down' && 'bg-blue-100/50 dark:bg-blue-900/30'
        )}
      >
        <span
          className={cn(
            'font-medium',
            isPositive ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
          )}
        >
          {formatPercent(coin.price_change_percentage_24h)}
        </span>
      </TableCell>
      <TableCell>{formatCompact(coin.total_volume)}</TableCell>
      <TableCell>{formatCompact(coin.market_cap)}</TableCell>
    </TableRow>
  );
});

CoinRow.displayName = 'CoinRow';
