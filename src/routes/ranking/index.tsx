import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
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
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default Ranking
