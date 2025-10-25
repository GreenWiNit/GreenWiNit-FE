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
import Lv2Img from '@/components/dashboard/lv2.svg?react'
import Lv3Img from '@/components/dashboard/lv3.svg?react'
import Lv4Img from '@/components/dashboard/lv4.svg?react'
import MyItemModal from '@/components/dashboard/my-item-modal'
import { useEffect, useRef, useState } from 'react'
import DecorationItem from '@/components/dashboard/decoration-item'
import { Item, PlacedItem } from '@/types/dashboard'
import { levelImgs } from '@/constant/dashboard-level-image'
import { v4 as uuid } from 'uuid'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  //나의 아이템 모달 상태
  const [isItemModal, setIsItemModal] = useState<boolean>(false)
  const toggleItemModal = () => {
    setIsItemModal((prev) => !prev)
  }

  //현재 레벨
  const currentLevel = 1

  //현재 레벨의 진행 수치
  const currentExp = 10
  //현재 point
  const currentPoint = 250

  //대시보드 상단 오른쪽 아이콘들
  const icons = [
    { id: 1, Component: BackpackIcon, onClick: toggleItemModal },
    { id: 2, Component: TrashIcon, onClick: toggleItemModal },
    { id: 3, Component: StoreIcon, onClick: toggleItemModal },
    { id: 4, Component: DiskIcon, onClick: toggleItemModal },
  ]

  //나의 아이템 리스트
  const [itemList, setItemList] = useState<Item[]>([
    { id: 546, name: '아이템1', count: 2, img: Lv1Img },
    { id: 847, name: '아이템2', count: 2, img: Lv2Img },
    { id: 123, name: '아이템3', count: 1, img: Lv3Img },
    { id: 111, name: '아이템4', count: 1, img: Lv4Img },
    { id: 334, name: '아이템5', count: 1, img: Lv4Img },
    { id: 777, name: '아이템6', count: 1, img: Lv4Img },
  ])

  //대시보드 꾸미기 아이템 컨테이너 ref
  const decorationContainerRef = useRef<HTMLDivElement>(null)
  //대시보드 꾸미기 아이템 컨테이너 크기
  const [decorationContainerSize, setDecorationContainerSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  //대시보드 꾸미기 아이템 컨테이너 값 구하기
  useEffect(() => {
    if (decorationContainerRef.current) {
      const { width, height } = decorationContainerRef.current.getBoundingClientRect()
      setDecorationContainerSize({ width, height })
    }
  }, [])

  /** 배치하고 싶은 아이템 클릭 함수 */
  const handlePlaceItem = (itemId: number) => {
    toggleItemModal() //모달 닫기

    //아이템 리스트에서 클릭한 아이템 찾기
    const selectedItem = itemList.find((item) => item.id === itemId)
    if (!selectedItem) return //아이템이 없으면 종료

    // 아이템 count -1로 업데이트
    setItemList(
      (prev) =>
        prev
          .map((item) => (item.id === itemId ? { ...item, count: item.count - 1 } : item))
          .filter((item) => item.count > 0), // count가 0 이하인 아이템 제거
    )

    // 아이템 초기 위치 (컨테이너 정중앙) 계산
    //현재 이미지 크기를 임의로 설정 추후 DB에서 받아올 수도
    const x = decorationContainerSize.width / 2 - 80 / 2
    const y = decorationContainerSize.height / 2 - 80 / 2

    //배치중인 아이템 리스트에 추가
    setPlacedItemList((prev) => [
      ...prev,
      {
        id: uuid(),
        name: selectedItem.name,
        img: selectedItem.img,
        position: {
          x: x,
          y: y,
        }, //초기 위치 설정 (정중앙)
      },
    ])
  }

  //현재 배치중인 아이템 리스트
  //구성은 추후 백엔드 api 따라
  const [placedItemList, setPlacedItemList] = useState<PlacedItem[]>([
    // { id: 1, name: '아이템1', img: Lv1Img, position: { x: 95, y: -291 } },
    // { id: 2, name: '아이템2', img: Lv2Img, position: { x: -105, y: -129 } },
  ])

  /** 아이템 드래그 종료 시 위치 업데이트 */
  const handlePlacedItemList = (id: string, x: number, y: number) => {
    setPlacedItemList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              position: { x, y },
            }
          : item,
      ),
    )
  }

  //드래그 중인 아이템 id
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  /** 아이템 드래그 시작 시 맨 위로 올리기 */
  const handleDragStart = (id: string) => {
    setActiveItemId(id)
  }

  //레벨별 img
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
          <div className="absolute top-3.5 right-[13px] z-40 flex flex-col gap-2.5">
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

          {/* 꾸미기 아이템 영역 */}
          <div ref={decorationContainerRef} className="relative h-full w-full max-w-full">
            {/* 나의 레벨 이미지 영역 */}
            <div className="absolute bottom-0 left-1/2 z-50 -translate-x-1/2">
              {CurrentLevelImg && <CurrentLevelImg />}
            </div>

            {/* 배치중인 아이템들 */}
            {placedItemList.map(({ id, img: Img, position }, index) => (
              <DecorationItem
                handlePlacedItemList={(x, y) => handlePlacedItemList(id, x, y)}
                key={`${id}-${position.x}-${position.y}`}
                Img={Img}
                position={position}
                index={index}
                handleDragStart={() => handleDragStart(id)}
                isActive={activeItemId === id}
              />
            ))}
          </div>

          {/* 현재 내 진행상황 영역 level, point, 목표*/}
          <DashboardStatus
            currentExp={currentExp}
            currentPoint={currentPoint}
            currentLevel={currentLevel}
          />

          {/* 나의 아이템 모달 */}
          {isItemModal && (
            <MyItemModal
              handlePlaceItem={handlePlaceItem}
              itemList={itemList}
              toggleItemModal={toggleItemModal}
            />
          )}
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}
