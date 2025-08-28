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

  // 터치 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    if (touch) {
      setTouchStartY(touch.clientY)
      setTouchStartTime(Date.now())
    }
  }

  // 터치 종료
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0]
    if (touch) {
      handleSwipe(touch.clientY)
    }
  }

  // 스와이프 처리
  const handleSwipe = (touchEndY: number) => {
    if (!touchStartY || !touchStartTime) return

    const distance = touchStartY - touchEndY
    const duration = Date.now() - touchStartTime
    const minSwipeDistance = 20

    if (Math.abs(distance) > minSwipeDistance) {
      // 속도 계산 (px/ms)
      const velocity = Math.abs(distance) / duration

      // 가속도 기반 스와이프 배수 계산
      // 기본값: 30px당 1개, 속도가 빠를수록 배수 증가
      const ITEM_HEIGHT_FONT_SIZE = 24
      const ITEM_HEIGHT_APPLYIED = ITEM_HEIGHT_FONT_SIZE * 2
      const baseMultiplier = Math.max(1, Math.floor(Math.abs(distance) / ITEM_HEIGHT_APPLYIED))
      const velocityMultiplier = Math.min(3, Math.floor(velocity * 1.5))
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
  }

  return (
    <div
      ref={containerRef}
      className="relative h-24 w-12 overflow-hidden rounded-lg sm:h-32 md:h-36 md:w-16"
      onWheel={onWheel}
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') return
        e.currentTarget.setPointerCapture(e.pointerId)
        setTouchStartY(e.clientY)
        setTouchStartTime(Date.now())
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== 'mouse') return
        handleSwipe(e.clientY)
        if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId)
        }
      }}
      onPointerCancel={() => {
        setTouchStartY(null)
        setTouchStartTime(null)
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
