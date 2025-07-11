import { challengesApi, challengesQueryKeys, Team } from '@/api/challenges'
import LogoIcon from '../LogoIcon'
import { useUserStore } from '@/store/userStore'
import { Ellipsis as MoreHorizIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface OverviewProps {
  team: Team
  allowManage?: boolean
}

const Overview = ({ team, allowManage = false }: OverviewProps) => {
  const params = useParams<{ challengeId: string }>()
  const challengeId = params.challengeId
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const teamLeader = team.users.find((t) => t.isLeader)
  const isLeader = user?.id === teamLeader?.id
  const [showConfirmDeletingDialog, setShowConfirmDeletingDialog] = useState(false)

  const { mutate: deleteTeam } = useMutation({
    mutationFn: () => challengesApi.deleteTeam(team.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: challengesQueryKeys.list().queryKey })
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.detail(challengeId).queryKey,
      })
      navigate(`/challenges/${challengeId}/teams`)
    },
  })

  return (
    <div className="relative flex flex-col items-center gap-2 p-4">
      {isLeader && allowManage ? (
        <Popover>
          <PopoverTrigger asChild>
            <MoreHorizIcon className="absolute top-3 right-3 cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent align="end" className="overlay-hidden w-auto p-0">
            <div className="flex flex-col">
              {/* @TODO attach click event handler to move page */}
              <button
                className="px-4 py-1 text-sm focus-visible:outline-0"
                onClick={() => navigate(`/challenges/${challengeId}/teams/${team.id}/modify`)}
              >
                수정하기
              </button>
              <Separator orientation="horizontal" />
              <button
                className="px-4 py-1 text-sm focus-visible:outline-0"
                onClick={() => setShowConfirmDeletingDialog(true)}
              >
                삭제하기
              </button>
            </div>
          </PopoverContent>
        </Popover>
      ) : null}
      <LogoIcon size="large" className="border-1 bg-white" />
      <span className="text-mountain_meadow-700 text-2xl font-bold">{team.name}</span>
      <Dialog
        open={showConfirmDeletingDialog}
        onOpenChange={() => setShowConfirmDeletingDialog(false)}
      >
        <DialogTitle>팀 삭제</DialogTitle>
        <DialogContent className="flex flex-col gap-6">
          <DialogDescription className="text-center !text-sm">
            팀을 삭제하시겠습니까?
            <br />
            팀 삭제시, 기존 다른 팀원의
            <br />
            [나의 팀] 목록에서도 삭제됩니다.
          </DialogDescription>
          <div className="flex gap-2">
            <Button size="sm" variant="cancel" onClick={() => setShowConfirmDeletingDialog(false)}>
              취소
            </Button>
            <Button size="sm" onClick={() => deleteTeam()}>
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Overview
