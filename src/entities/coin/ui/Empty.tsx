import { Coins } from 'lucide-react';

interface EmptyProps {
  message?: string;
}

export const Empty = ({ message = 'No coins found' }: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Coins className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};
