export type ChallengeType = 'individual' | 'team'
export interface ChallengeTabProps {
  activeTab: ChallengeType
  onTabChange: (tab: ChallengeType) => void
}
