import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { createFileRoute } from '@tanstack/react-router'
import BackpackIcon from '/public/icons/backpack.svg?react'
import TrashIcon from '/public/icons/trash.svg?react'
import StoreIcon from '/public/icons/store.svg?react'
import DiskIcon from '/public/icons/disk.svg?react'
import DashboardStatus from '@/components/dashboard/dashboard-status'
import Lv1Img from '@/components/dashboard/lv1.svg?react'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  //현재 레벨의 진행 수치
  const currentExp = 10
  //현재 point
  const currentPoint = 250

  const icons = [
    { id: 1, Component: BackpackIcon },
    { id: 2, Component: TrashIcon },
    { id: 3, Component: StoreIcon },
    { id: 4, Component: DiskIcon },
  ]
  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <PageTitle>대시보드</PageTitle>
        </PageLayOut.HeaderSection>
        <PageLayOut.BodySection
          padding="zero"
          className="relative mt-[23px] mb-6 flex flex-col items-center justify-end bg-gradient-to-b from-[#DCFCE7] to-[#E0F2FE]"
        >
          {/* 메뉴 아이콘 영역 */}
          <div className="absolute top-3.5 right-[13px] flex flex-col gap-2.5">
            {icons.map(({ id, Component }) => (
              <div
                key={id}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-0"
              >
                <Component />
              </div>
            ))}
          </div>

          <Lv1Img />

          {/* 현재 내 진행상황 영역 level, point, 목표*/}
          <DashboardStatus currentExp={currentExp} currentPoint={currentPoint} />
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}
