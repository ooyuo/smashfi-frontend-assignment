export interface DebouncedFunction<T extends unknown[]> {
  (...args: T): void;
  cancel: () => void;
}

export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): DebouncedFunction<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFn = (...args: T) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };

  debouncedFn.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debouncedFn;
};
