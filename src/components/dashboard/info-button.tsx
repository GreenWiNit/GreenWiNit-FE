import { useEffect, useRef, useState } from 'react'
import { Info as InfoOutlineIcon } from 'lucide-react'
import RoadMap from './roadmap'

const InfoButton = () => {
  //툴팁 상태
  const [isTooltip, setIsTooltip] = useState(false)

  //툴팁 위치 상태
  const [distanceFromBottom, setDistanceFromBottom] = useState<number | null>(null)
  const infoRef = useRef<HTMLDivElement | null>(null)

  const handleEnter = () => setIsTooltip(true)
  const handleLeave = () => setIsTooltip(false)

  //툴팁 위치 계산
  useEffect(() => {
    if (isTooltip && infoRef.current) {
      const rect = infoRef.current.getBoundingClientRect()
      const distance = window.innerHeight - rect.bottom
      setDistanceFromBottom(distance)
    }
  }, [isTooltip])
  return (
    <div className="relative w-4.5">
      {isTooltip && <RoadMap distanceFromBottom={distanceFromBottom} />}
      <div ref={infoRef}>
        <InfoOutlineIcon
          className="text-mountain_meadow size-4.5 cursor-pointer"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        />
      </div>
    </div>
  )
}

export default InfoButton
