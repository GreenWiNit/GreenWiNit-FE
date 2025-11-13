import { useMemo } from 'react'
import { useRankStore } from '@/store/rank-store'

interface UseTopRankersProps {
  start?: number
  end: number
}

export const useTopRankers = ({ start = 0, end }: UseTopRankersProps) => {
  const users = useRankStore((state) => state.users)

  return useMemo(() => {
    const sorted = [...users].sort((a, b) => {
      if (b.point !== a.point) return b.point - a.point
      return b.certificates - a.certificates
    })

    const rankers = sorted.slice(start, end)

    const myIndex = sorted.findIndex((user) => user.isMe)
    const isRankers = myIndex >= 0 && myIndex < end

    if (!isRankers && myIndex !== -1) {
      const mine = sorted[myIndex]
      if (mine) rankers.push(mine)
    }

    return rankers
  }, [users, start, end])
}
