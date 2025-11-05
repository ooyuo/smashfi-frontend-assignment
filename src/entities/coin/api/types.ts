/** 코인 데이터 (CoinGecko API 응답 형식) */
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
}

/** 코인 리스트 아이템 (검색용) */
export interface CoinListItem {
  id: string;
  symbol: string;
  name: string;
}

/** API 요청 파라미터 */
export interface FetchCoinsParams {
  vsCurrency?: string;
  perPage?: number;
  page?: number;
  order?:
    | 'market_cap_desc'
    | 'market_cap_asc'
    | 'volume_desc'
    | 'volume_asc'
    | 'id_desc'
    | 'id_asc';
  sparkline?: boolean;
  priceChangePercentage?: string;
  ids?: string;
}
