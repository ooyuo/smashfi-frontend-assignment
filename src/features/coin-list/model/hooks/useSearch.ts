import { useState, useEffect, useMemo } from 'react';
import { debounce } from '@/shared/lib/debounce';
import { DEBOUNCE_DELAY } from '@/shared/config/constants';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedQuery(value);
      }, DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    debouncedSetQuery(query);

    return () => {
      debouncedSetQuery.cancel();
    };
  }, [query, debouncedSetQuery]);

  return {
    query,
    setQuery,
    debouncedQuery,
  };
};
