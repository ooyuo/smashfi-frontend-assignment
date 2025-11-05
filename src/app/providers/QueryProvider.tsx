import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DEFAULT_QUERY_CLIENT_CONFIG } from '@/shared/config/query';

const queryClient = new QueryClient(DEFAULT_QUERY_CLIENT_CONFIG);

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
