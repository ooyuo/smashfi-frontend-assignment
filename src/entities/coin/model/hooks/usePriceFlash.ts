import { useEffect, useRef, useState } from 'react';

/** 가격 변동 시 flash 효과 */
export const usePriceFlash = (currentPrice: number) => {
  const prevPriceRef = useRef<number>(currentPrice);
  const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const prevPrice = prevPriceRef.current;

    if (prevPrice !== currentPrice) {
      setPriceFlash(currentPrice > prevPrice ? 'up' : 'down');
      prevPriceRef.current = currentPrice;

      const timer = setTimeout(() => setPriceFlash(null), 500);
      return () => clearTimeout(timer);
    }
  }, [currentPrice]);

  return priceFlash;
};
