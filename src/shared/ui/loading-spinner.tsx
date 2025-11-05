import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const SIZE_MAP = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
} as const;

export const LoadingSpinner = ({ size = 'md', message }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`${SIZE_MAP[size]} animate-spin text-muted-foreground`} />
      {message && <span className="ml-2 text-sm text-muted-foreground">{message}</span>}
    </div>
  );
};
