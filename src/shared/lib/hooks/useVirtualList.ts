import { useRef, useMemo, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface UseVirtualListParams {
  /** 전체 아이템 개수 */
  count: number;
  /** 각 아이템의 예상 높이 (px) */
  estimateSize: number;
  /** 뷰포트 밖에 미리 렌더링할 아이템 개수 */
  overscan?: number;
  /** 스크롤 인덱스 변경 콜백 */
  onScrollIndexChange?: (index: number) => void;
}

/** 가상 스크롤 리스트 */
export const useVirtualList = ({
  count,
  estimateSize,
  overscan = 5,
  onScrollIndexChange,
}: UseVirtualListParams) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const lastItemIndex = useMemo(() => virtualItems[virtualItems.length - 1]?.index, [virtualItems]);

  // 현재 보고 있는 첫 번째 아이템 인덱스 추적
  const currentIndex = virtualItems[0]?.index ?? 0;

  useEffect(() => {
    if (onScrollIndexChange) {
      onScrollIndexChange(currentIndex);
    }
  }, [currentIndex, onScrollIndexChange]);

  return {
    parentRef,
    virtualizer,
    virtualItems,
    lastItemIndex,
  };
};
