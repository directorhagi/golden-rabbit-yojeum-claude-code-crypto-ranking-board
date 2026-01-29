export interface CoinData {
  rank: number
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume: number
  logo: string
}

export interface CoinGeckoMarketData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_percentage_24h: number
}
