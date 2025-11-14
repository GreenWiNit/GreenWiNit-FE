import { useTopRankers } from '@/hooks/rank/use-top-ranker'
import RankingCard from './ranking-card'

const RankerContainer = () => {
  const EXTRA_RANKER = 3
  const RANKER = 9
  const userRank = useTopRankers({ start: EXTRA_RANKER, end: RANKER })

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      {userRank.map((user, index) => {
        const isMe = user.isMe
        const isExtraMe = isMe && index === userRank.length - 1

        return (
          <li className="flex w-full flex-row items-center gap-4" key={index}>
            <RankingCard classname="w-full" user={user} rank={index + 4} unrankME={isExtraMe} />
          </li>
        )
      })}
    </div>
  )
}

export default RankerContainer
