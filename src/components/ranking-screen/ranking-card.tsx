import { cn } from '@/lib/utils'
import { User } from '@/types/ranking'

interface RankingCardProps {
  user: User | undefined
  rank: number
  unrankME: boolean
}

const RankingCard = ({ user, rank, unrankME }: RankingCardProps) => {
  const isMe = user?.isMe

  if (user?.profile === null) {
    user.profile = '/img/profile.png'
  }

  return (
    <div className="mx-2 flex w-full flex-row items-center gap-4">
      <p className="text-lg font-bold">{unrankME ? '-' : rank}</p>
      <div className="flex flex-1 flex-row items-center gap-2">
        <img src={user?.profile} className="h-10 w-10" />
        <span className={cn('font-bold', isMe && 'text-red-600')}>
          {isMe ? `나(${user?.name})` : user?.name}
        </span>
      </div>
      <div className="flex flex-col">
        <span className={cn('text-mountain_meadow-500 font-bold', isMe && 'text-red-600')}>
          {user?.point}P
        </span>
        <span className="text-ring text-xs">인증 {user?.certificates}개</span>
      </div>
    </div>
  )
}

export default RankingCard
