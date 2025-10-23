import { cn } from '@/lib/utils'
import levelsInfo, { LevelInfoType } from '@/constant/roadmap-level-info'

interface RoadMapProps {
  /** 웹사이트 bottom과의 거리 */
  distanceFromBottom: number | null
}
const RoadMap = ({ distanceFromBottom }: RoadMapProps) => {
  //현재 나의 레벨
  const currentLevel = 1

  //레벨 리스트 정보
  const levelListInfo: LevelInfoType[] = levelsInfo

  if (distanceFromBottom === null) return null
  return (
    <div
      className="fixed bottom-0 left-1/2 flex -translate-x-1/2 gap-6 rounded-2xl bg-[rgba(255,255,255,0.8)] p-6"
      style={{ transform: `translateY(-${distanceFromBottom + 30}px)` }}
    >
      {levelListInfo.map(({ id, img, point, name }) => (
        <div key={id} className={'flex flex-col gap-2'}>
          <div
            className={cn(
              'shadow-[0_10px_15px_-3px_rgba(0, 0, 0, 0.1)] relative flex h-14 w-14 items-center justify-center rounded-full bg-white p-3 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]',
              currentLevel === id &&
                'bg-gradient-to-br from-[#4ADE80] to-[#10B981] shadow-[0_10px_15px_-3px_#BBF7D0]',
            )}
          >
            <img src={img} alt={`level ${id}`} />

            {levelListInfo.length !== id && (
              <div
                className={cn(
                  'absolute top-1/2 right-0 h-1 w-6 translate-x-full bg-[#D1D5DB]',
                  currentLevel >= id && 'bg-gradient-to-r from-[#4ADE80] to-[#10B981]',
                )}
              ></div>
            )}
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                'text-xs font-bold text-[#C0C0C0]',
                currentLevel === id && 'text-[#0FBA7E]',
              )}
            >
              {name}
            </span>
            <span className="text-xs text-[#6B7280]">{point}P</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RoadMap
