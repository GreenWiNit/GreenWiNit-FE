import levelsInfo from '@/constant/roadmap-level-info'
import InfoButton from './info-button'

interface DashboardStatusProps {
  nextLevelPercent: number
  currentPoint: number
  currentLevel: string
}
const DashboardStatus = ({
  nextLevelPercent,
  currentPoint,
  currentLevel,
}: DashboardStatusProps) => {
  const currentLevelInfo = levelsInfo.find((level) => level.engName === currentLevel)

  const currentIndex = levelsInfo.findIndex((level) => level.engName === currentLevel)
  const nextLevelInfo = levelsInfo[currentIndex + 1]
  return (
    <div className="mt-[22px] mb-[30px] flex w-[284px] flex-col gap-1.5 rounded-2xl bg-white px-2 py-[17px]">
      <div className="flex justify-between">
        <div className="flex items-center gap-[7px]">
          <h3 className="text-title-smaller font-bold">
            Lv.{currentLevelInfo?.id} {currentLevelInfo?.name}
          </h3>
          <InfoButton />
        </div>
        <span className="text-mountain_meadow-500 text-base font-bold">{currentPoint}P</span>
      </div>
      <div>
        <div className="relative h-3 w-full rounded-full bg-[#E5E7EB]">
          <div
            className={`bg-pink absolute top-0 h-full rounded-full bg-pink-200 bg-gradient-to-l from-[#0FBA7E] to-[#E4F1B6]`}
            style={{ width: `${nextLevelPercent}%` }}
          ></div>
        </div>
      </div>
      <span className="pt-1.5 text-[12px] text-[#4B5563]">
        다음 레벨까지 {nextLevelPercent}% 완료 • 목표: {nextLevelInfo?.name ?? '최고 레벨'}
      </span>
    </div>
  )
}

export default DashboardStatus
