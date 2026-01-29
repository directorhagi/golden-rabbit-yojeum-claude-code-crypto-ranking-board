"use client"

import { useEffect, useState, useCallback } from "react"
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CoinData } from "@/lib/types"

interface CryptoRankingTableProps {
  initialData: CoinData[]
}

function formatNumber(num: number): string {
  if (num >= 1e12) {
    return `$${(num / 1e12).toFixed(2)}T`
  }
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`
  }
  if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}K`
  }
  return `$${num.toFixed(2)}`
}

function formatPrice(price: number): string {
  if (price >= 1) {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return `$${price.toFixed(4)}`
}

export function CryptoRankingTable({ initialData }: CryptoRankingTableProps) {
  const [coins, setCoins] = useState<CoinData[]>(initialData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchData = useCallback(async () => {
    setIsRefreshing(true)
    setError(null)

    try {
      const response = await fetch('/api/crypto')

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to fetch data')
      }

      const data: CoinData[] = await response.json()
      setCoins(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [fetchData])

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-black">₿</span>
                </div>
                암호화폐 순위
              </CardTitle>
              <div className="flex items-center gap-2">
                {isRefreshing && (
                  <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
                )}
                <span className="text-xs text-gray-500">
                  마지막 업데이트: {lastUpdated.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {error ? (
              <div className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-400 mb-4">{error}</p>
                <Button
                  onClick={fetchData}
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800"
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  다시 시도
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800 bg-gray-900/50">
                      <th className="text-left p-4 text-gray-400 font-medium">순위</th>
                      <th className="text-left p-4 text-gray-400 font-medium">이름</th>
                      <th className="text-right p-4 text-gray-400 font-medium">가격</th>
                      <th className="text-right p-4 text-gray-400 font-medium">24시간 변동률</th>
                      <th className="text-right p-4 text-gray-400 font-medium hidden md:table-cell">시가총액</th>
                      <th className="text-right p-4 text-gray-400 font-medium hidden lg:table-cell">거래량 (24시간)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coins.map((coin, index) => (
                      <tr
                        key={coin.symbol}
                        className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${
                          index % 2 === 0 ? "bg-gray-900/20" : "bg-gray-900/40"
                        }`}
                      >
                        <td className="p-4">
                          <span className="text-gray-300 font-medium">{coin.rank}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={coin.logo || "/placeholder.svg"} alt={coin.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <div className="font-semibold text-white">{coin.name}</div>
                              <div className="text-sm text-gray-400">{coin.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-semibold text-white">{formatPrice(coin.price)}</span>
                        </td>
                        <td className="p-4 text-right">
                          <Badge
                            variant="secondary"
                            className={`${
                              coin.change24h >= 0
                                ? "bg-green-900/30 text-green-400 border-green-800"
                                : "bg-red-900/30 text-red-400 border-red-800"
                            } flex items-center gap-1 justify-end`}
                          >
                            {coin.change24h >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {coin.change24h >= 0 ? "+" : ""}
                            {coin.change24h.toFixed(2)}%
                          </Badge>
                        </td>
                        <td className="p-4 text-right hidden md:table-cell">
                          <span className="text-gray-300">{formatNumber(coin.marketCap)}</span>
                        </td>
                        <td className="p-4 text-right hidden lg:table-cell">
                          <span className="text-gray-300">{formatNumber(coin.volume)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>데이터는 60초마다 업데이트됩니다 • Powered by CoinGecko</p>
        </div>
      </div>
    </div>
  )
}
