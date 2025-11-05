import { memo } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export const FavoriteButton = memo(({ isFavorite, onToggle }: FavoriteButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={cn('h-8 w-8', isFavorite && 'text-yellow-500 hover:text-yellow-600')}
      aria-label={isFavorite ? '즐겨찾기 제거' : '즐겨찾기 추가'}
    >
      <Star className={cn('h-5 w-5', isFavorite && 'fill-current')} />
    </Button>
  );
});

FavoriteButton.displayName = 'FavoriteButton';
