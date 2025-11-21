import Loading from '../common/loading'
import PointOverview from './point-overview'

interface PointDescriptionProps {
  description: string | undefined
  price: number | undefined
  remainingQuantity?: number | undefined
  selectedQuantity: number
  onQuantityChange: (quantity: number) => void
  availablePoint: number
  isLoading: boolean
  /** 꾸미기 아이템 전용 상세페이지인지 */
  isItem?: boolean
}

const PointDescription = ({
  description,
  price,
  remainingQuantity,
  selectedQuantity,
  onQuantityChange,
  availablePoint,
  isLoading,
  isItem,
}: PointDescriptionProps) => {
  const availablePurchaseCount = Math.max(Math.floor(availablePoint / (price ?? 1)), 5)
  const selectableCount = Math.min(availablePurchaseCount, remainingQuantity ?? 0)
  const finalCount = Math.min(selectableCount, 5)

  const deductPoint = isLoading ? 0 : selectedQuantity * (price ?? 0)
  const isLeakPoint = availablePoint - deductPoint < 0
  const textIfDoneExchangingPoint =
    isLoading || isLeakPoint ? '구매 불가' : `${availablePoint - deductPoint}p`

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-col pt-4 text-center">
      <p className="text-xl font-extrabold">{isItem ? '아이템 설명' : '제품 설명'}</p>
      <p className="text-title-smaller p-4 text-left text-sm">{description}</p>
      <hr />
      <PointOverview
        label="사용 가능 포인트"
        point={`${availablePoint}p`}
        valueClassName="text-mountain_meadow"
      />

      <PointOverview
        label="수량 선택"
        point={availablePoint}
        valueClassName="text-green-500"
        isButton={true}
        remainingQuantity={finalCount}
        onQuantityChange={onQuantityChange}
        selectedQuantity={selectedQuantity}
      />

      <PointOverview label="차감 포인트" point={`${deductPoint}p`} valueClassName="text-red-500" />
      <PointOverview
        label="남은 포인트"
        point={textIfDoneExchangingPoint}
        valueClassName="text-mountain_meadow"
      />
      <hr />
    </div>
  )
}

export default PointDescription
