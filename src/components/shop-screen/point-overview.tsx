import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PointOverviewProps {
  label: string
  point: string | number | undefined
  valueClassName?: string
  isButton?: boolean
  remainingQuantity?: number | undefined
  onQuantityChange?: (quantity: number) => void
  selectedQuantity?: number
}

const PointOverview = ({
  label,
  point,
  valueClassName = '',
  isButton = false,
  remainingQuantity,
  onQuantityChange,
  selectedQuantity = 1,
}: PointOverviewProps) => {
  const [selectedCount, setSelectedCount] = useState(selectedQuantity)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSelectedCount(selectedQuantity)
  }, [selectedQuantity])

  const handleDownClick = () => {
    if (maxCount > 0) {
      setIsOpen((prev) => !prev)
    }
  }

  const handleQuantitySelect = (quantity: number) => {
    setSelectedCount(quantity)
    setIsOpen(false)
    onQuantityChange?.(quantity)
  }

  const isLimited = typeof remainingQuantity === 'number'
  const maxCount = isLimited ? remainingQuantity : 5
  const quantityOptions = Array.from({ length: maxCount }, (_, i) => i + 1)
  return (
    <div className="text-md relative flex flex-row justify-between p-4">
      <p className="text-black">{label}</p>
      {isButton ? (
        <div className="relative">
          <button
            className={cn('roudned-[5px] flex items-center gap-5 px-[10px] py-[5px]', {
              'cursor-not-allowed bg-gray-100 text-gray-400': remainingQuantity === 0,
              'bg-gray-200 hover:bg-gray-300': !isLimited || remainingQuantity > 0,
            })}
            onClick={handleDownClick}
            disabled={isLimited && remainingQuantity === 0}
          >
            {isLimited && remainingQuantity === 0 ? '품절' : selectedCount}
            <ChevronDown size={16} />
          </button>
          {isOpen && maxCount > 0 && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <div className="absolute top-full right-0 z-20 mt-1 overflow-y-auto bg-gray-500 font-bold text-black">
                {quantityOptions.map((quantity, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuantitySelect(quantity)}
                    className={cn(
                      'transition-color w-full px-3 py-2 text-left text-sm hover:bg-gray-100',
                      {
                        'bg-gray-200 text-black': selectedCount === quantity,
                        'bg-gray-400': selectedCount !== quantity,
                      },
                    )}
                  >
                    {quantity}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <p className={cn('font-bold', valueClassName)}>{point}</p>
      )}
    </div>
  )
}

export default PointOverview
