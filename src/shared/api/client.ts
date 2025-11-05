import axios from 'axios';

/**
 * Axios 클라이언트 인스턴스
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('API Error:', error.response?.status, error.message);
    }
    return Promise.reject(error);
  }
);
