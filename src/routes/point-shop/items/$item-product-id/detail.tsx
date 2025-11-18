// import { useUserStatus } from '@/hooks/use-user-status'
import Loading from '@/components/common/loading'
import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import NoticeDialog from '@/components/common/modal/notice-dialog'
import PageLayOut from '@/components/common/page-layout'
import ExchangeProduct from '@/components/shop-screen/exchange-product'
import PointDescription from '@/components/shop-screen/point-description'
import useItem from '@/hooks/item/use-item'
import useItemOrder from '@/hooks/item/use-item-order'
import { useUserStatus } from '@/hooks/use-user-status'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/point-shop/items/$item-product-id/detail')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const pointProductId = Route.useParams()['item-product-id']

  const { mutate: itemOrder } = useItemOrder(pointProductId, () => {
    setShowNoticeDialog(true)
  })

  const [selectedQuantity, setSelectedQuantity] = useState(1)
  //교환 확인 다이얼로그
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const handleConfirmDialog = async () => {
    setShowConfirmDialog(!showConfirmDialog)
  }
  //교환 완료 다이얼로그
  const [showNoticeDialog, setShowNoticeDialog] = useState(false)
  const handleExchange = async () => {
    setShowNoticeDialog(!showNoticeDialog)
    navigate({ to: '/point-shop' })
  }

  const { data: product, isLoading: productLoading } = useItem(pointProductId)
  const { data: userStatus, isLoading: userLoading } = useUserStatus()

  const isLoading = productLoading || userLoading
  const availablePoint = userStatus?.result?.userTotalPoints ?? 0
  const deductPoint = isLoading ? 0 : selectedQuantity * (product?.price ?? 0)

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity)
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
        <PageLayOut.BodySection padding="zero" className="m-0">
          <div className="relative w-full">
            <div className="bg-lighter-gray-border absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-full">
              <PageLayOut.HeaderSection.BackIcon className="static" />
            </div>

            <div className="flex w-full justify-center bg-gray-100 p-4">
              <img src={product?.thumbnail} alt="Product" />
            </div>
          </div>

          <div className="p-4 text-left font-bold">
            <p className="text-2xl text-black">{product?.itemName}</p>
            <p className="text-mountain_meadow text-3xl">{product?.price} 포인트</p>
          </div>

          <hr />

          <PointDescription
            description={product?.description}
            price={product?.price}
            // remainingQuantity={product?.stockQuantity}
            selectedQuantity={selectedQuantity}
            onQuantityChange={handleQuantityChange}
            availablePoint={availablePoint}
            isLoading={isLoading}
            isItem={true}
          />

          <ExchangeProduct
            availablePoint={availablePoint}
            deductPoint={deductPoint}
            handleClick={handleConfirmDialog}
            // remainingQuantity={product?.stockQuantity}
            isItem={true}
          />

          {/* 아이템 교환 확인 다이얼로그 */}
          <ConfirmDialog
            className="pb-5"
            isOpen={showConfirmDialog}
            setIsOpen={setShowConfirmDialog}
            description={
              <div className="text-nowrap">
                <p>
                  <strong>{product?.itemName}</strong> 아이템을
                  <br />
                  교환하시겠습니까?
                </p>
              </div>
            }
            onConfirm={itemOrder}
          />

          {/* 아이템 교환 완료 다이얼로그 */}
          <NoticeDialog
            className="px-3 pb-5"
            isOpen={showNoticeDialog}
            setIsOpen={setShowNoticeDialog}
            description={
              <div className="whitespace-nowrap">
                <p className="whitespace-nowrap">교환이 완료되었습니다!</p>
                <p className="">
                  대시보드 - 식물 꾸미기 화면에서
                  <br />
                  아이템이 업데이트 되었어요.
                </p>
              </div>
            }
            onConfirm={handleExchange}
          />
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
    </PageLayOut.Container>
  )
}
