import BottomNavigation from '@/components/common/bottom-navigation'
import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'
import FilteredChallengesDisplay from '@/components/filtered-challenges-display'

const JoinedChallenges = () => {
  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>참여 챌린지</PageTitle>
      </PageHeaderSection>
      <FilteredChallengesDisplay />
      <BottomNavigation />
    </PageContainer>
  )
}

export default JoinedChallenges
