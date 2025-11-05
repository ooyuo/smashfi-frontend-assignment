import { useState } from 'react';
import { SortKey, DEFAULT_SORT } from '../constants';
import { SortDirection, SORT_DIRECTIONS } from '@/shared/types/sort';
import { toggleSortDirection } from '@/shared/utils/sort';

export const useSort = () => {
  const [sortKey, setSortKey] = useState<SortKey>(DEFAULT_SORT.key);
  const [sortDirection, setSortDirection] = useState<SortDirection>(DEFAULT_SORT.direction);

  const toggleSort = (key: SortKey) => {
    const isSameKey = sortKey === key;

    if (isSameKey) {
      setSortDirection(toggleSortDirection);
    } else {
      setSortKey(key);
      setSortDirection(SORT_DIRECTIONS.DESC);
    }
  };

  return {
    sortKey,
    sortDirection,
    toggleSort,
  };
};
