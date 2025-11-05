import { Component, ReactNode } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Button } from './button';
import { Card } from './card';
import { AlertCircle, Wifi, Clock, ServerCrash } from 'lucide-react';
import { getErrorInfo } from '@/shared/lib/error';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const ERROR_ICONS = {
  network: Wifi,
  'rate-limit': Clock,
  server: ServerCrash,
  'not-found': AlertCircle,
  unknown: AlertCircle,
} as const;

class ErrorBoundaryClass extends Component<
  ErrorBoundaryProps & { onReset: () => void },
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps & { onReset: () => void }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset();
  };

  render() {
    if (this.state.hasError) {
      const errorInfo = getErrorInfo(this.state.error);
      const Icon = ERROR_ICONS[errorInfo.type];

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-md w-full p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-destructive/10 p-3">
                <Icon className="h-8 w-8 text-destructive" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{errorInfo.title}</h2>
                <p className="text-muted-foreground">{errorInfo.message}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Button onClick={this.handleReset} className="flex-1" variant="default">
                  Try again
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1"
                  variant="outline"
                >
                  Reload page
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="w-full text-left">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    Error details
                  </summary>
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-40">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/** TanStack Query와 통합된 Error Boundary */
export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => <ErrorBoundaryClass onReset={reset}>{children}</ErrorBoundaryClass>}
    </QueryErrorResetBoundary>
  );
};
