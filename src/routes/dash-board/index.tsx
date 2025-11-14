import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { Button } from '@/components/common/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dash-board/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const handleNavigateRanking = () => {
    navigate({ to: '/ranking' })
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageTitle>대시보드</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection>
        <Button onClick={handleNavigateRanking}>랭킹 보러 가기</Button>
      </PageLayOut.BodySection>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

// interface BoardButtonItemProps {
//   icon: LucideIcon
//   label: string
// }

// const BOARD_BUTTON_ITEMS: BoardButtonItemProps[] = [
//   {
//     icon: Backpack,
//     label: '인벤토리',
//   },
//   {
//     icon: Trash2,
//     label: '삭제',
//   },
//   {
//     icon: Store,
//     label: '상점',
//   },
//   {
//     icon: Save,
//     label: '저장',
//   },
// ]
