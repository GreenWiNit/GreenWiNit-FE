import AppTitle from '@/components/common/AppTitle'
import BottomNavigation from '@/components/common/BottomNav'
import UserCard from '@/components/common/UserCard'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Challenges from '@/components/home-screen/Challenges'
import PageContainer from '@/components/common/PageContainer'
import { Button } from '@/components/ui/button'
import WarnNotLoggedIn from '@/components/home-screen/WarnNotLoggedIn'
import PageHeaderSection from '@/components/common/PageHeaderSection'

function Home() {
  const isLoggedIn = useIsLoggedIn()
  const navigate = useNavigate()
  const [isWarnNotLoggedInDialogOpen, setIsWarnNotLoggedInDialogOpen] = useState(false)

  const handleClickJoinedChallengeButton = () => {
    if (!isLoggedIn) {
      setIsWarnNotLoggedInDialogOpen(true)
      return
    }

    navigate('/challenges/user/me/joined')
  }

  return (
    <PageContainer>
      <PageHeaderSection>
        <AppTitle className="!text-3xl" />
      </PageHeaderSection>
      <div className="mt-5 flex flex-col p-4">
        <UserCard />
        <Button size="flex" onClick={handleClickJoinedChallengeButton} className="mt-6">
          참여 챌린지
        </Button>
        <WarnNotLoggedIn
          isOpen={isWarnNotLoggedInDialogOpen}
          onOpenChange={setIsWarnNotLoggedInDialogOpen}
          redirectUrl="/challenges/user/me/joined"
        />
      </div>
      <Challenges />
      <BottomNavigation />
    </PageContainer>
  )
}

export default Home
