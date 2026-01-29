import { NextResponse } from 'next/server'
import type { CoinData, CoinGeckoMarketData } from '@/lib/types'

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets'

export async function GET() {
  try {
    const params = new URLSearchParams({
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: '20',
      page: '1',
      sparkline: 'false',
    })

    const response = await fetch(`${COINGECKO_API_URL}?${params}`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data: CoinGeckoMarketData[] = await response.json()

    const coins: CoinData[] = data.map((coin) => ({
      rank: coin.market_cap_rank,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h ?? 0,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
      logo: coin.image,
    }))

    return NextResponse.json(coins)
  } catch (error) {
    console.error('Failed to fetch crypto data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cryptocurrency data' },
      { status: 500 }
    )
  }
}
