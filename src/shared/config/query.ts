import { HTTP_STATUS } from '../lib/error';

/** QueryClient 기본 설정 */
export const DEFAULT_QUERY_CLIENT_CONFIG = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분
      gcTime: 1000 * 60 * 5, // 5분
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
};

/**
 * 코인 목록 조회 옵션
 * - refetchInterval: 제거 (rate limit 방지, 필요시 수동 refetch)
 * - retry: 429 에러 시 재시도 안 함
 */
export const COIN_LIST_QUERY_OPTIONS = {
  staleTime: 1000 * 30, // 30초
  gcTime: 1000 * 60 * 10, // 10분
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: (failureCount: number, error: unknown) => {
    // 429 Too Many Requests: 재시도 안 함
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === HTTP_STATUS.TOO_MANY_REQUESTS) return false;
    }
    return failureCount < 1;
  },
};
