import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CryptoRankingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-black">₿</span>
              </div>
              암호화폐 순위
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
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
                  {Array.from({ length: 10 }).map((_, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-800/50 ${
                        index % 2 === 0 ? "bg-gray-900/20" : "bg-gray-900/40"
                      }`}
                    >
                      <td className="p-4">
                        <Skeleton className="h-5 w-6 bg-gray-700" />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-8 h-8 rounded-full bg-gray-700" />
                          <div className="space-y-1">
                            <Skeleton className="h-4 w-24 bg-gray-700" />
                            <Skeleton className="h-3 w-12 bg-gray-700" />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end">
                          <Skeleton className="h-5 w-20 bg-gray-700" />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end">
                          <Skeleton className="h-6 w-16 bg-gray-700 rounded-full" />
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex justify-end">
                          <Skeleton className="h-5 w-20 bg-gray-700" />
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <div className="flex justify-end">
                          <Skeleton className="h-5 w-20 bg-gray-700" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>데이터는 60초마다 업데이트됩니다 • Powered by CoinGecko</p>
        </div>
      </div>
    </div>
  )
}
