import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { createFileRoute } from '@tanstack/react-router'
import BackpackIcon from '/public/icons/backpack.svg?react'
import TrashIcon from '/public/icons/trash.svg?react'
import StoreIcon from '/public/icons/store.svg?react'
import DiskIcon from '/public/icons/disk.svg?react'
import DashboardStatus from '@/components/dashboard/dashboard-status'
import MyItemModal from '@/components/dashboard/my-item-modal'
import { useState } from 'react'
import { levelImgs } from '@/constant/dashboard-level-image'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  //나의 아이템 모달 상태
  const [isItemModal, setIsItemModal] = useState<boolean>(false)
  const toggleItemModal = () => {
    setIsItemModal((prev) => !prev)
  }

  const currentLevel = 1

  //현재 레벨의 진행 수치
  const currentExp = 10
  //현재 point
  const currentPoint = 250

  //대시보드 상단 오른쪽 menu list
  //TODO: 인벤토리 아이콘 제외 로직 변경 필요
  const icons = [
    { id: 1, Component: BackpackIcon, onClick: toggleItemModal },
    { id: 2, Component: TrashIcon, onClick: toggleItemModal },
    { id: 3, Component: StoreIcon, onClick: toggleItemModal },
    { id: 4, Component: DiskIcon, onClick: toggleItemModal },
  ]

  //현재 레벨에 맞는 이미지
  const CurrentLevelImg = levelImgs[currentLevel - 1]

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
            {icons.map(({ id, Component, onClick }) => (
              <div
                key={id}
                onClick={onClick}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-0"
              >
                <Component />
              </div>
            ))}
          </div>

          {/* 나의 레벨 이미지 영역 */}
          {CurrentLevelImg && <CurrentLevelImg />}

          {/* 현재 내 진행상황 영역 level, point, 목표*/}
          <DashboardStatus
            currentExp={currentExp}
            currentPoint={currentPoint}
            currentLevel={currentLevel}
          />

          {/* 나의 아이템 모달 */}
          {isItemModal && <MyItemModal toggleItemModal={toggleItemModal} />}
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}
