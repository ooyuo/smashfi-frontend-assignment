import { SortDirection, SORT_DIRECTIONS } from '@/shared/types/sort';

/** 정렬 방향 토글 */
export const toggleSortDirection = (current: SortDirection): SortDirection => {
  return current === SORT_DIRECTIONS.ASC ? SORT_DIRECTIONS.DESC : SORT_DIRECTIONS.ASC;
};

/**
 * 객체 배열을 특정 키로 비교하는 함수 생성
 * @param key - 비교할 객체의 키
 * @param direction - 정렬 방향
 * @returns 비교 함수
 */
export const compareBy = <T>(key: keyof T, direction: SortDirection) => {
  return (a: T, b: T): number => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      const diff = aValue - bValue;
      return direction === 'asc' ? diff : -diff;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return direction === 'asc' ? comparison : -comparison;
    }

    return 0;
  };
};

/**
 * 안정적인 정렬 (동일한 값의 순서 유지)
 * @param array - 정렬할 배열
 * @param compareFn - 비교 함수
 * @returns 정렬된 새 배열
 */
export const stableSort = <T>(array: T[], compareFn: (a: T, b: T) => number): T[] => {
  const indexed = array.map((item, index) => ({ item, index }));

  indexed.sort((a, b) => {
    const comparison = compareFn(a.item, b.item);
    return comparison !== 0 ? comparison : a.index - b.index;
  });

  return indexed.map(({ item }) => item);
};
