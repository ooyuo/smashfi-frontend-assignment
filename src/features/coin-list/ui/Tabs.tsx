import { memo } from 'react';
import { cn } from '@/shared/lib/utils';
import { TAB_TYPES } from '../model/constants';
import type { TabType } from '../model/constants';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Tabs = memo(({ activeTab, onTabChange }: TabsProps) => {
  return (
    <div className="inline-flex items-center bg-muted p-1 rounded-lg">
      <button
        onClick={() => onTabChange(TAB_TYPES.ALL)}
        className={cn(
          'px-4 py-2 rounded-md text-sm font-medium transition-colors',
          activeTab === TAB_TYPES.ALL
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        All
      </button>
      <button
        onClick={() => onTabChange(TAB_TYPES.FAVORITES)}
        className={cn(
          'px-4 py-2 rounded-md text-sm font-medium transition-colors',
          activeTab === TAB_TYPES.FAVORITES
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        My favorite
      </button>
    </div>
  );
});

Tabs.displayName = 'Tabs';
