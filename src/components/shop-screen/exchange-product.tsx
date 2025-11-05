import { cn } from '@/lib/utils'
import { Button } from '@/components/common/button'

interface ExchangeProductProps {
  availablePoint: number
  deductPoint: number
  remainingQuantity: number | undefined
  handleClick: () => void
  /** 꾸미기 아이템 전용 상세페이지인지 */
  isItem?: boolean
}

const ExchangeProduct = ({
  availablePoint,
  deductPoint,
  remainingQuantity,
  handleClick,
  isItem = false,
}: ExchangeProductProps) => {
  const isDisabled = availablePoint < deductPoint || remainingQuantity === 0

  return (
    <div className="w-full">
      {isItem ? (
        <p className="text-title-smaller px-4 pt-4 text-sm whitespace-pre-line">
          ※ 본 아이템 교환 시, 대시보드의 식물 꾸미기 화면에 적용됩니다.
        </p>
      ) : (
        <p className="text-title-smaller px-4 pt-4 text-sm whitespace-pre-line">
          * 본 리워드는 봉사프로젝트 굿즈로 환불과 교환이 불가합니다. 제품 불량 및 파손 시에는
          [1:1문의]를 통해 연락주세요.
        </p>
      )}

      <div className="w-full p-4">
        <Button
          onClick={handleClick}
          className={cn(
            'w-full rounded-md p-4 font-bold text-white',
            isDisabled && 'bg-gray-400 text-gray-600',
          )}
          disabled={isDisabled}
        >
          포인트 교환하기
        </Button>
      </div>
    </div>
  )
}

export default ExchangeProduct
