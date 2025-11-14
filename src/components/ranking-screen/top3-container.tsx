import { useTopRankers } from '@/hooks/rank/use-top-ranker'
import ProfileImage from '../common/profile-image'
import { cn } from '@/lib/utils'

const Top3Container = () => {
  const TOP_RANKER = 3
  const userRank = useTopRankers({ end: TOP_RANKER })
  const rankerIndex = [userRank[1], userRank[0], userRank[2]]

  return (
    <div className="border-ring mx-2 flex flex-row border-b-2 p-2 pb-4">
      {rankerIndex.map((user, index) => {
        const realRank = index === 1 ? 1 : index === 0 ? 2 : 3
        const isMe = user?.isMe

        return (
          <div
            key={index}
            className={cn(
              'mx-2 flex flex-col items-center gap-4',
              realRank === 1 ? 'mt-2' : 'mt-4',
            )}
          >
            <ProfileImage
              imageUrl={
                user?.profile === undefined || user?.profile === null
                  ? '/profile.png'
                  : user.profile
              }
              size={60}
            />
            <div className="bg-mountain_meadow-100 h-40 w-20 items-center rounded-md px-2 py-4">
              <div className="mb-4 text-3xl">
                {realRank === 1 && <span>🥇</span>}
                {realRank === 2 && <span>🥈</span>}
                {realRank === 3 && <span>🥉</span>}
              </div>
              <p
                className={cn(
                  'text-sm font-bold whitespace-nowrap',
                  isMe === true && 'text-red-600',
                )}
              >
                {isMe ? `나(${user?.name})` : user?.name}
              </p>
              <p className="text-ring text-sm whitespace-nowrap">인증{user?.certificates} 개</p>
              <p
                className={cn(
                  'text-mountain_meadow-500 mt-2 text-xs font-bold',
                  isMe === true && 'text-red-600',
                )}
              >
                {user?.point}P
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Top3Container
