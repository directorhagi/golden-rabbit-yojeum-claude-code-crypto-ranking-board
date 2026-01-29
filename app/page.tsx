import { Suspense } from "react"
import CryptoRankingBoard from "../crypto-ranking-board"
import { CryptoRankingSkeleton } from "@/components/crypto-ranking-skeleton"

export default function Page() {
  return (
    <Suspense fallback={<CryptoRankingSkeleton />}>
      <CryptoRankingBoard />
    </Suspense>
  )
}
