import { useMemo } from 'react'
import { useRankStore } from '@/store/rank-store'

interface UseTopRankersProps {
  start?: number
  end: number
}

export const useTopRankers = ({ start = 0, end }: UseTopRankersProps) => {
  const users = useRankStore((state) => state.users)

  return useMemo(() => {
    return [...users]
      .sort((a, b) => {
        if (b.point !== a.point) {
          return b.point - a.point
        }
        return b.certificates - a.certificates
      })
      .slice(start, end)
  }, [users, start, end])
}
