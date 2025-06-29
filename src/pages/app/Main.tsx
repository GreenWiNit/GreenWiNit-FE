import AppTitle from '@/components/common/AppTitle'
import BottomNavigation from '@/components/common/BottomNav'
import UserCard from '@/components/home-screen/UserCard'
import { useUserStore } from '@/store/userStore'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Challenges from '@/components/home-screen/Challenges'
import PageContainer from '@/components/common/PageContainer'
import { Button } from '@/components/ui/button'

function Main() {
  const user = useUserStore((s) => s.user)
  const navigate = useNavigate()
  const [isWarnNotLoggedInDialogOpen, setIsWarnNotLoggedInDialogOpen] = useState(false)

  const handleClickJoinedChallengeButton = () => {
    if (user == null) {
      setIsWarnNotLoggedInDialogOpen(true)
      return
    }

    navigate('/challenges/user/me/joined')
  }

  return (
    <PageContainer>
      <div className="flex h-24 w-full items-center justify-center bg-white">
        <AppTitle className="!text-3xl" />
      </div>
      <div className="mt-5 p-4">
        <UserCard />
        <Button onClick={handleClickJoinedChallengeButton} className="mt-6">
          참여 챌린지
        </Button>
        <Dialog
          open={isWarnNotLoggedInDialogOpen}
          onClose={() => setIsWarnNotLoggedInDialogOpen(false)}
        >
          <DialogContent>
            <DialogContentText className="text-center !text-black">
              로그인 후<br />
              챌린지에 참여할 수 있어요.
            </DialogContentText>
            <div className="mt-6 flex flex-row gap-6">
              <button
                className="border-mountain_meadow w-full rounded-lg border bg-white p-2"
                onClick={() => setIsWarnNotLoggedInDialogOpen(false)}
              >
                취소
              </button>
              <button
                className="bg-mountain_meadow w-full rounded-lg p-2 text-white"
                onClick={() => navigate('/login?redirect=/challenges/user/me/joined')}
              >
                확인
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Challenges />
      <BottomNavigation />
    </PageContainer>
  )
}

export default Main
