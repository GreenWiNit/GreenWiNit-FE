import { CommonChallenge } from '@/api/challenges'
import { ChallengeType } from '@/types/challenge'

export interface TabProps {
  tab: ChallengeType
  setTab: (tab: ChallengeType) => void
}

export interface InfoButtonProps {
  text: string
}

export interface ChallengePreviewProps {
  category: 'individual' | 'team'
  challenges: CommonChallenge[] | null | undefined
}
