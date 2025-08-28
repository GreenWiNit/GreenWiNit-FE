import { cn } from '@/lib/utils'

interface WheelItemProps<T extends string | number> {
  value: T
  isSelected: boolean
  distance: number
  maxDistance: number
  onClick: () => void
}

const WheelItem = <T extends string | number>({
  value,
  isSelected,
  distance,
  maxDistance,
  onClick,
}: WheelItemProps<T>) => {
  const maxRotation = maxDistance === 1 ? 30 : 90
  const rotation = (distance / maxDistance) * maxRotation
  const opacity = Math.max(0.3, 1 - Math.abs(distance) * 0.3)
  const scale = Math.max(0.8, 1 - Math.abs(distance) * 0.1)
  const translateY = distance * 32

  return (
    <div
      className={cn(
        'wheel-item absolute flex h-12 transform-gpu cursor-pointer items-center justify-center text-lg transition-all duration-300 ease-out select-none',
        isSelected ? 'z-10 text-2xl font-medium' : 'text-gray-400',
      )}
      style={
        {
          '--translate-y': `${translateY}px`,
          '--rotation': `${rotation}deg`,
          '--scale': scale,
          '--opacity': opacity,
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      {value}
    </div>
  )
}

export default WheelItem
