import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import Top3Container from '@/components/ranking-screen/top3-container'
import { useRankStore } from '@/store/rank-store'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'

export const Route = createFileRoute('/ranking/')({
  component: Ranking,
})

function Ranking() {
  const TOP_RANKER = 3
  const users = useRankStore((state) => state.users)

  const sortUserRank = useMemo(() => {
    return [...users]
      .sort((a, b) => {
        if (b.point !== a.point) {
          return b.point - a.point
        }
        return b.certificates - a.certificates
      })
      .slice(0, TOP_RANKER)
  }, [users])

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageTitle>주간 랭킹</PageTitle>
      </PageLayOut.HeaderSection>
      <div className="flex flex-col items-baseline p-4">
        <h3 className="font-bold">TOP 3 챌린저</h3>
        <p className="text-ring text-xs">
          포인트와 인증 수 기준으로 매주 월요일 자정에 순위가 갱신돼요.
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <Top3Container userRank={sortUserRank} />
      </div>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default Ranking
