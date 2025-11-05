import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TAB_TYPES } from '../constants';
import type { TabType } from '../constants';

interface TabsState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const store = create<TabsState>()(
  persist(
    (set) => ({
      activeTab: TAB_TYPES.ALL,

      setActiveTab: (tab: TabType) => {
        set({ activeTab: tab });
      },
    }),
    {
      name: 'smashfi-tabs',
    }
  )
);

export const useTabsStore = store;
export const useTabs = store;
