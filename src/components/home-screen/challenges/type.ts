import { ChallengeType } from '@/types/challenge'

export interface TabProps {
  tab: ChallengeType
  setTab: (tab: ChallengeType) => void
}

export interface InfoButtonProps {
  onOpenChange: (open: boolean) => void
  isOpen: boolean
  onClick: () => void
  text: string
}
