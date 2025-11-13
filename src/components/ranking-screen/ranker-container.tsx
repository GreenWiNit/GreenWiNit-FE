import { useTopRankers } from '@/hooks/rank/use-top-ranker'

const RankerContainer = () => {
  const EXTRA_RANKER = 3
  const RANKER = 9
  const userRank = useTopRankers({ start: EXTRA_RANKER, end: RANKER })

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      {userRank.map((user, index) => (
        <ul className="flex flex-row items-center justify-center gap-4" key={index}>
          <p className="text-lg font-bold">{index + 4}</p>
          <div className="flex flex-1 flex-row items-center gap-2">
            <img src={user.profile} className="h-10 w-10" />
            <span className="font-bold">{user.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-mountain_meadow-500 font-bold">{user.point}P</span>
            <span className="text-ring text-xs">인증 {user.certificates}개</span>
          </div>
        </ul>
      ))}
    </div>
  )
}

export default RankerContainer
