import { ErrorBoundary } from '@/shared/ui/error-boundary';
import { QueryProvider } from './providers/QueryProvider';
import { ToastProvider } from './providers/ToastProvider';
import { RouterProvider } from './providers/RouterProvider';

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <RouterProvider />
        <ToastProvider />
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
