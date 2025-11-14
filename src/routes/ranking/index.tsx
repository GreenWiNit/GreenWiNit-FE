import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import RankerContainer from '@/components/ranking-screen/ranker-container'
import Top3Container from '@/components/ranking-screen/top3-container'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ranking/')({
  component: Ranking,
})

function Ranking() {
  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageTitle>주간 랭킹</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.ScrollableContent>
        <div className="mx-4 flex flex-col items-baseline justify-baseline p-2">
          <h3 className="font-bold">TOP 3 챌린저</h3>
          <p className="text-ring text-xs">
            포인트와 인증 수 기준으로 매주 월요일 자정에 순위가 갱신돼요.
          </p>
        </div>
        <div className="mx-4 flex flex-col items-center justify-center">
          <Top3Container />
          <RankerContainer />
        </div>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default Ranking
