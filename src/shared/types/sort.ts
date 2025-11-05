/** 정렬 방향 */
export type SortDirection = 'asc' | 'desc';

/** 정렬 방향 상수 */
export const SORT_DIRECTIONS = {
  ASC: 'asc' as const,
  DESC: 'desc' as const,
} as const;
