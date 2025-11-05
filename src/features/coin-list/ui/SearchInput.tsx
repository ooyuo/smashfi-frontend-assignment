import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="심볼 또는 이름으로 검색..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
        aria-label="코인 검색"
      />
    </div>
  );
};
