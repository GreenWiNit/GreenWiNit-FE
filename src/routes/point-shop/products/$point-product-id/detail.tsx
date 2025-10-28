import DeliveryAddress from '@/components/shop-screen/delivery-address'
import PointDescription from '@/components/shop-screen/point-description'
import ExchangeProduct from '@/components/shop-screen/exchange-product'
import PageLayOut from '@/components/common/page-layout'
import useProduct from '@/hooks/product/use-product'
import { useUserStatus } from '@/hooks/use-user-status'
import { useState } from 'react'
import Loading from '@/components/common/loading'
import { createFileRoute } from '@tanstack/react-router'
import useAddress from '@/hooks/use-adress'
import NoticeDialog from '@/components/common/modal/notice-dialog'
import { pointApi } from '@/api/points'
import { toast } from 'sonner'
import ConfirmDialog from '@/components/common/modal/confirm-dialog'

export const Route = createFileRoute('/point-shop/products/$point-product-id/detail')({
  component: ProductDetail,
})

function ProductDetail() {
  const pointProductId = Route.useParams()['point-product-id']

  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showNoticeDialog, setShowNoticeDialog] = useState(false)
  const [isExchanging, setIsExchanging] = useState(false)

  const { data: product, isLoading: productLoading } = useProduct(pointProductId)
  const { data: userStatus, isLoading: userLoading } = useUserStatus()
  const { data: user } = useAddress()

  const isLoading = productLoading || userLoading
  const availablePoint = userStatus?.result?.userTotalPoints ?? 0
  const deductPoint = isLoading ? 0 : selectedQuantity * (product?.price ?? 0)

  const handleExchangeButton = () => {
    setShowConfirmDialog(true)
  }

  const handleConfirm = async () => {
    setIsExchanging(true)

    if (user === undefined) {
      return
    }

    const exchangeData = {
      deliveryAddressId: user.id,
      orderItemId: parseInt(pointProductId),
      quantity: selectedQuantity,
    }

    pointApi
      .exchangeProduct(exchangeData)
      .then(() => {
        setShowConfirmDialog(false)
        setShowNoticeDialog(true)
      })
      .catch((error) => {
        toast.error('교환 실패:', error)
      })
      .finally(() => {
        setIsExchanging(false)
      })
  }

  const handleExchange = async () => {
    setShowNoticeDialog(false)
    window.location.reload()
  }

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

            <div className="flex h-75 w-full justify-center bg-gray-100 p-4">
              <img src={product?.thumbnailUrl} alt="Product" />
            </div>
            <div className="p-4 text-left font-bold">
              <p className="text-xl text-black">{product?.name}</p>
              <p className="text-mountain_meadow text-2xl">{product?.price} 포인트</p>
            </div>
            <hr />
          </div>
          <PointDescription
            description={product?.description}
            price={product?.price}
            remainingQuantity={product?.stockQuantity}
            selectedQuantity={selectedQuantity}
            onQuantityChange={handleQuantityChange}
            availablePoint={availablePoint}
            isLoading={isLoading}
          />
          <DeliveryAddress pointProductId={pointProductId} />
          <ExchangeProduct
            availablePoint={availablePoint}
            deductPoint={deductPoint}
            handleClick={handleExchangeButton}
            remainingQuantity={product?.stockQuantity}
          />
          <ConfirmDialog
            isOpen={showConfirmDialog}
            setIsOpen={setShowConfirmDialog}
            description={
              <div className="mb-4 w-48 text-left">
                <p>
                  <strong>이름:</strong> {user?.name} <br />
                  <strong>전화번호:</strong> {user?.phone} <br />
                  <strong>주소:</strong> {`${user?.address.roadAddress} `}
                  {user?.address.detailAddress}
                </p>
              </div>
            }
            paragraph={`수정이 불가능하니\n 리워드 수령 정보를 다시 확인해주세요.`}
            onConfirm={handleConfirm}
            isPending={isExchanging}
          />
          <NoticeDialog
            isOpen={showNoticeDialog}
            setIsOpen={setShowNoticeDialog}
            description={
              <div className="w-48">
                <p className="mb-4 font-bold whitespace-nowrap">교환 신청이 완료되었습니다!</p>
                <p className="mb-4 text-xs">
                  [마이페이지] -{'>'} [포인트 현황]에서
                  <br />
                  확인할 수 있어요
                </p>
                <p className="text-xs">배송까지 약 3~7일 소요될 예정입니다.</p>
              </div>
            }
            onConfirm={handleExchange}
          />
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
    </PageLayOut.Container>
  )
}

export default ProductDetail
