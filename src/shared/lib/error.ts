import { AxiosError } from 'axios';

/** HTTP 상태 코드 */
export const HTTP_STATUS = {
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

/** 에러 정보 타입 */
export interface ErrorInfo {
  type: 'network' | 'rate-limit' | 'server' | 'not-found' | 'unknown';
  title: string;
  message: string;
}

/** HTTP 상태 코드가 서버 에러인지 확인 */
const isServerError = (status: number): boolean => {
  const serverErrors = [
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    HTTP_STATUS.BAD_GATEWAY,
    HTTP_STATUS.SERVICE_UNAVAILABLE,
    HTTP_STATUS.GATEWAY_TIMEOUT,
  ];
  return serverErrors.includes(status as (typeof serverErrors)[number]);
};

/** 에러를 분석하여 사용자에게 표시할 정보 반환 */
export const getErrorInfo = (error: Error | null): ErrorInfo => {
  if (!error) {
    return {
      type: 'unknown',
      title: 'Something went wrong',
      message: 'An unexpected error occurred',
    };
  }

  if ('isAxiosError' in error) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;

    if (!status) {
      return {
        type: 'network',
        title: 'Network Error',
        message: '네트워크 연결을 확인해주세요.',
      };
    }

    if (status === HTTP_STATUS.TOO_MANY_REQUESTS) {
      return {
        type: 'rate-limit',
        title: 'Rate Limit Exceeded',
        message: 'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.',
      };
    }

    if (isServerError(status)) {
      return {
        type: 'server',
        title: 'Server Error',
        message: '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      };
    }

    if (status === HTTP_STATUS.NOT_FOUND) {
      return {
        type: 'not-found',
        title: 'Not Found',
        message: '요청한 데이터를 찾을 수 없습니다.',
      };
    }
  }

  return {
    type: 'unknown',
    title: 'Something went wrong',
    message: error.message || 'An unexpected error occurred',
  };
};
