import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { TOAST_MESSAGES } from '../constants';

interface FavoritesState {
  favoriteIds: Set<string>;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

interface PersistedFavoritesState {
  favoriteIds: string[];
}

const store = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: new Set<string>(),

      addFavorite: (id: string) => {
        const newSet = new Set(get().favoriteIds);
        newSet.add(id);
        set({ favoriteIds: newSet });
        toast.success(TOAST_MESSAGES.SUCCESS_ADD);
      },

      removeFavorite: (id: string) => {
        const newSet = new Set(get().favoriteIds);
        newSet.delete(id);
        set({ favoriteIds: newSet });
        toast.success(TOAST_MESSAGES.SUCCESS_DELETE);
      },

      toggleFavorite: (id: string) => {
        const currentSet = get().favoriteIds;
        const newSet = new Set(currentSet);
        const isRemoving = currentSet.has(id);

        if (isRemoving) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }

        set({ favoriteIds: newSet });
        toast.success(isRemoving ? TOAST_MESSAGES.SUCCESS_DELETE : TOAST_MESSAGES.SUCCESS_ADD);
      },
    }),
    {
      name: 'smashfi-favorites',
      partialize: (state) => ({
        favoriteIds: Array.from(state.favoriteIds),
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as PersistedFavoritesState | undefined;
        return {
          ...currentState,
          favoriteIds: new Set(persisted?.favoriteIds || []),
        };
      },
    }
  )
);

export const useFavoritesStore = store;
export const useFavorites = store;
