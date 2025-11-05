import { ArrowUp, ArrowDown } from 'lucide-react';
import { SortDirection, SORT_DIRECTIONS } from '@/shared/types/sort';

interface SortIndicatorProps {
  isActive: boolean;
  direction: SortDirection;
}

export const SortIndicator = ({ isActive, direction }: SortIndicatorProps) => {
  if (!isActive) return null;

  const isAscending = direction === SORT_DIRECTIONS.ASC;
  const ariaLabel = `정렬: ${isAscending ? '오름차순' : '내림차순'}`;

  return (
    <span className="ml-1 inline-flex" aria-label={ariaLabel}>
      {isAscending ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
    </span>
  );
};
