import { useRef, useState } from 'react'
import WheelItem from './wheel-item'

interface TimeWheelProps<T extends string | number> {
  items: readonly T[]
  selectedValue: T
  onWheel: (e: React.WheelEvent) => void
  onTouchChange?: (direction: 'up' | 'down') => void
  padLeft?: boolean
  onClickWheelItem: (item: T) => void
  isHour?: boolean
}

const TimeWheel = <T extends string | number>({
  items,
  selectedValue,
  onWheel,
  onTouchChange,
  padLeft = false,
  onClickWheelItem,
  isHour,
}: TimeWheelProps<T>) => {
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [touchStartTime, setTouchStartTime] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isWheeling = useRef(false)
  const wheelingSpeed = useRef(0)

  const startAt = (clientY: number) => {
    setTouchStartY(clientY)
    setTouchStartTime(Date.now())
  }

  const finishAt = (clientY: number, multiplier = 1) => {
    handleSwipe(clientY, multiplier)
  }

  const initDraggingSpeed = () => {
    // @TODO 실제로는 css 애니메이션 처리가 완료되었을 때 처리해야함
    setTimeout(() => {
      if (!isWheeling.current) {
        wheelingSpeed.current = 0
      }
    }, 500)
  }

  const handleMouseFinish = (e: React.MouseEvent) => {
    if (isWheeling.current) {
      finishAt(e.clientY, 1)
    }
    isWheeling.current = false
    initDraggingSpeed()
  }

  // 터치 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    if (touch) {
      startAt(touch.clientY)
    }
  }

  // 터치 종료
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0]
    if (touch) {
      finishAt(touch.clientY, 2)
    }
  }

  /**
   * 스와이프 처리
   *
   * @param touchEndY 터치 종료 위치
   * @param multiplier 모바일은 2, PC-크롬은 1이 적당한듯
   */
  const handleSwipe = (touchEndY: number, multiplier = 1) => {
    if (!touchStartY || !touchStartTime) return

    const distance = touchStartY - touchEndY
    const duration = Date.now() - touchStartTime
    const minSwipeDistance = 20

    if (Math.abs(distance) > minSwipeDistance) {
      const currentSpeed = Math.abs(distance) / duration
      // 속도 계산 (px/ms)
      const velocity = wheelingSpeed.current
        ? wheelingSpeed.current * 2 + currentSpeed
        : currentSpeed
      wheelingSpeed.current = velocity

      // 가속도 기반 스와이프 배수 계산
      // 기본값: 30px당 1개, 속도가 빠를수록 배수 증가
      const ITEM_HEIGHT_FONT_SIZE = 24
      const ITEM_HEIGHT_APPLYIED = ITEM_HEIGHT_FONT_SIZE * multiplier
      const baseMultiplier = Math.max(1, Math.abs(distance) / ITEM_HEIGHT_APPLYIED)
      const velocityMultiplier = Math.min(1, velocity * 1.5)
      const swipeMultiplier = baseMultiplier * velocityMultiplier

      if (onTouchChange) {
        // 스와이프 거리와 속도에 따라 여러 번 호출
        for (let i = 0; i < swipeMultiplier; i++) {
          if (distance > 0) {
            onTouchChange('up')
          } else {
            onTouchChange('down')
          }
        }
      } else {
        // fallback 로직도 동일하게 수정
        const currentIndex = items.indexOf(selectedValue)
        let newIndex: number

        if (distance > 0) {
          // 위로 스와이프 (값 증가)
          newIndex = (currentIndex + swipeMultiplier) % items.length
        } else {
          // 아래로 스와이프 (값 감소)
          newIndex = (currentIndex - swipeMultiplier + items.length) % items.length
        }

        const newItem = items[newIndex]
        if (newItem !== undefined) {
          onClickWheelItem(newItem)
        }
      }
    }

    // 터치 상태 초기화
    setTouchStartY(null)
    setTouchStartTime(null)
    initDraggingSpeed()
  }

  return (
    <div
      ref={containerRef}
      className="relative h-24 w-12 overflow-hidden rounded-lg"
      onWheel={onWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={(e) => {
        isWheeling.current = true
        startAt(e.clientY)
      }}
      onMouseUp={handleMouseFinish}
      onMouseLeave={handleMouseFinish}
    >
      <div className="flex h-full transform flex-col items-center justify-center transition-transform duration-300 ease-out">
        {items.map((item, index) => {
          const isSelected = isHour
            ? Number(item) % 12 === Number(selectedValue) % 12
            : item === selectedValue
          const distance = index - items.indexOf(selectedValue)
          const maxDistance = Math.floor(items.length / 2)

          return (
            <WheelItem
              key={item}
              value={padLeft ? item.toString().padStart(2, '0') : item}
              isSelected={isSelected}
              distance={distance}
              maxDistance={maxDistance}
              onClick={() => onClickWheelItem(item)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TimeWheel
