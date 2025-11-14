import {
  CommonChallenge,
  GetCertifiedChallengesMineElement,
  JoinedChallengesMineReponseElement,
} from '@/api/challenges'
import { cn } from '@/lib/utils'
import { MouseEventHandler } from 'react'
import { DEFAULT_CHALLENGE_IMAGE } from '@/constant/challenge'
import CertifiedStatus from '@/components/common/certified-status'

interface ChallengeProps {
  challenge:
    | GetCertifiedChallengesMineElement
    | JoinedChallengesMineReponseElement
    | CommonChallenge
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
}

const Challenge = ({ challenge, onClick, className }: ChallengeProps) => {
  const view = {
    title: challenge.challengeName,
    image: challenge.challengeImage,
    subText: 'currentParticipant' in challenge && `참여: ${challenge.currentParticipant}명`,
    certifiedStatus: 'certifiedDate' in challenge ? challenge.certificationStatus : null,
  }

  return (
    <div
      className={cn(
        'border-lighter-gray-border flex flex-1 basis-[164px] flex-col overflow-hidden rounded-xl border bg-white',
        onClick ? 'cursor-pointer' : null,
        className,
        view.certifiedStatus ? 'relative' : null,
      )}
      onClick={onClick}
    >
      <img className="h-22 w-full object-cover" src={view.image || DEFAULT_CHALLENGE_IMAGE} />
      <div className="flex flex-col gap-1 p-3 text-start">
        <span className="text-title-smaller overflow-hidden text-sm font-bold text-ellipsis whitespace-nowrap">
          {view.title}
        </span>
        <span className="overflow-hidden text-sm text-ellipsis whitespace-nowrap text-[#737373]">
          {view.subText}
        </span>
      </div>
      {view.certifiedStatus && (
        <div className="absolute right-3 bottom-3">
          <CertifiedStatus status={view.certifiedStatus} size="sm" />
        </div>
      )}
    </div>
  )
}

export default Challenge
