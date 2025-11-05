import { useEffect } from 'react';

interface UseInfiniteScrollParams {
  /** 현재 렌더링된 마지막 아이템 인덱스 */
  lastItemIndex: number | undefined;
  /** 전체 아이템 개수 */
  totalCount: number;
  /** 다음 페이지가 있는지 여부 */
  hasNextPage: boolean;
  /** 다음 페이지를 가져오는 중인지 여부 */
  isFetchingNextPage: boolean;
  /** 다음 페이지 가져오기 함수 */
  fetchNextPage: () => void;
  /** 트리거 임계값 (끝에서 몇 개 남았을 때 호출할지) */
  threshold?: number;
}

/** 무한 스크롤 트리거 (가상 스크롤과 함께 사용) */
export const useInfiniteScroll = ({
  lastItemIndex,
  totalCount,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 20,
}: UseInfiniteScrollParams) => {
  useEffect(() => {
    if (
      lastItemIndex !== undefined &&
      lastItemIndex >= totalCount - threshold &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [lastItemIndex, totalCount, hasNextPage, isFetchingNextPage, fetchNextPage, threshold]);
};
