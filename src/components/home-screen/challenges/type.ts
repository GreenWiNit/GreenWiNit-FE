import { ChallengeType } from '@/types/challenge'

export interface TabProps {
  tab: ChallengeType
  setTab: (tab: ChallengeType) => void
}

export interface InfoButtonProps {
  text: string
}
