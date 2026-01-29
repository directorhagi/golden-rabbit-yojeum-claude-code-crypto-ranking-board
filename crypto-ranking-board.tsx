import { CryptoRankingTable } from "@/components/crypto-ranking-table"
import type { CoinData } from "@/lib/types"

async function fetchCryptoData(): Promise<CoinData[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  const response = await fetch(`${baseUrl}/api/crypto`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch crypto data')
  }

  return response.json()
}

export default async function CryptoRankingBoard() {
  const initialData = await fetchCryptoData()

  return <CryptoRankingTable initialData={initialData} />
}
