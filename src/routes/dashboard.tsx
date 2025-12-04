import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import BackpackIcon from '/public/icons/backpack.svg?react'
import TrashIcon from '/public/icons/trash.svg?react'
import StoreIcon from '/public/icons/store.svg?react'
import DiskIcon from '/public/icons/disk.svg?react'
import DashboardStatus from '@/components/dashboard/dashboard-status'
import MyItemModal from '@/components/dashboard/my-item-modal'
import { useEffect, useRef, useState } from 'react'
import DecorationItem from '@/components/dashboard/decoration-item'
import { levelImgs } from '@/constant/dashboard-level-image'
import NoticeDialog from '@/components/common/modal/notice-dialog'
import useUserItems from '@/hooks/use-user-items'
import useUserGrowth from '@/hooks/use-user-growth'
import { UserItem } from '@/api/users'
import { useUserPoints } from '@/hooks/use-user-points'
import levelsInfo from '@/constant/roadmap-level-info'
import useUserItemPosition from '@/hooks/use-user-item-position'
import useUserItemApplicatbility from '@/hooks/use-user-item-applicatbility'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  //나의 아이템 list
  const { data: items } = useUserItems()

  const { mutate: itemPositionSave } = useUserItemPosition()
  const { mutate: itemApplicatbilitySave } = useUserItemApplicatbility()

  const { data: growthData } = useUserGrowth()
  const growthDataResult = growthData?.result

  const { data: pointData } = useUserPoints()

  //나의 아이템 모달 상태
  const [isItemModal, setIsItemModal] = useState<boolean>(false)
  const toggleItemModal = () => {
    setIsItemModal((prev) => !prev)
  }

  //현재 레벨
  const currentLevel = growthDataResult?.currentLevel ?? ''
  //현재 레벨에 맞는 이미지
  const CurrentLevelImg = levelImgs[levelsInfo.findIndex((level) => level.engName === currentLevel)]

  //대시보드 상단 오른쪽 menu list
  //TODO: 인벤토리 아이콘 제외 로직 변경 필요
  const icons = [
    { id: 1, Component: BackpackIcon, onClick: toggleItemModal },
    {
      id: 2,
      Component: TrashIcon,
      onClick: () => itemApplicatbilitySave(activeItemId),
    },
    { id: 3, Component: StoreIcon, onClick: () => navigate({ to: '/point-shop' }) },
    {
      id: 4,
      Component: DiskIcon,
      onClick: () =>
        itemPositionSave(
          {
            positionX: placedItemList.find((item) => item.id === activeItemId)?.positionX || 0,
            positionY: placedItemList.find((item) => item.id === activeItemId)?.positionY || 0,
            itemId: activeItemId,
          },
          {
            onSuccess: () => {
              const activeItem = placedItemList.find((item) => item.id === activeItemId)

              if (!activeItem?.applicability) {
                itemApplicatbilitySave(activeItemId)
              }
            },
          },
        ),
    },
  ]

  //나의 아이템 리스트
  const [itemList, setItemList] = useState<UserItem[]>([])
  //현재 배치중인 아이템 리스트
  const [placedItemList, setPlacedItemList] = useState<UserItem[]>([])

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
    const selectedItem = itemList?.find((item) => item.id === itemId)
    if (!selectedItem) return //아이템이 없으면 종료

    // 아이템 초기 위치 (컨테이너 정중앙) 계산
    //현재 이미지 크기를 임의로 설정 추후 DB에서 받아올 수도
    const x = decorationContainerSize.width / 2 - 80 / 2
    const y = decorationContainerSize.height / 2 - 80 / 2

    //배치중인 아이템 리스트에 추가
    setPlacedItemList((prev) => [
      ...prev,
      {
        id: selectedItem.id,
        itemName: selectedItem.itemName,
        itemImgUrl: selectedItem.itemImgUrl,
        applicability: selectedItem.applicability,
        positionX: x,
        positionY: y,
      },
    ])

    // 원본 리스트(itemList)에서 클릭한 아이템 제거
    setItemList((prev) => prev.filter((item) => item.id !== itemId))
  }

  /** 아이템 드래그 종료 시 위치 업데이트 */
  const handlePlacedItemList = (id: number, x: number, y: number) => {
    setPlacedItemList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              positionX: x,
              positionY: y,
            }
          : item,
      ),
    )
  }

  //드래그 중인 아이템 id
  const [activeItemId, setActiveItemId] = useState<number>(0)
  /** 아이템 드래그 시작 시 맨 위로 올리기 */
  const handleDragStart = (id: number) => {
    setActiveItemId(id)
  }

  const [showNoticeDialog, setShowNoticeDialog] = useState(false)
  const handleShowNoticeDialog = () => {
    setShowNoticeDialog(!showNoticeDialog)
    window.location.reload()
  }

  useEffect(() => {
    if (items?.result) {
      setItemList(items?.result.filter((item) => !item.applicability))
      setPlacedItemList(items?.result.filter((item) => item.applicability))
    }
  }, [items])

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
            <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
              {CurrentLevelImg && <CurrentLevelImg />}
            </div>

            {/* 배치중인 아이템들 */}
            {placedItemList.map(({ id, itemImgUrl: Img, positionX, positionY }, index) => (
              <DecorationItem
                handlePlacedItemList={(x, y) => handlePlacedItemList(id, x, y)}
                key={`${id}-${positionX}-${positionY}`}
                Img={Img}
                x={positionX}
                y={positionY}
                index={index}
                handleDragStart={() => handleDragStart(id)}
                isActive={activeItemId === id}
                imgSize={80}
              />
            ))}
          </div>

          {/* 현재 내 진행상황 영역 level, point, 목표*/}
          <DashboardStatus
            nextLevelPercent={growthDataResult?.nextLevelPercent ?? 0}
            currentPoint={pointData?.result?.totalEarned ?? 0}
            currentLevel={growthDataResult?.currentLevel ?? ''}
          />

          {/* 나의 아이템 모달 */}
          {isItemModal && (
            <MyItemModal
              handlePlaceItem={handlePlaceItem}
              itemList={itemList}
              toggleItemModal={toggleItemModal}
            />
          )}

          <NoticeDialog
            isOpen={showNoticeDialog}
            setIsOpen={setShowNoticeDialog}
            title={
              <strong>
                축하합니다!
                <br />
                <br />
                레벨업 했어요!
              </strong>
            }
            description={<>계속 챌린지에 도전해볼까요?</>}
            onConfirm={handleShowNoticeDialog}
          />
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}
