import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import BottomNavigation from '@/components/common/bottom-navigation'
import { Button } from '@/components/common/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/common/modal/dialog'
import { useState } from 'react'
import { showMessageIfExists } from '@/lib/error'
import ChallengeTitle from '@/components/common/challenges/challenge-title'
import useChallenge from '@/hooks/challenge/use-challenge'
import { DEFAULT_CHALLENGE_IMAGE } from '@/constant/challenge'
import { validateSearchChallengeType } from '@/lib/router'

export const Route = createFileRoute('/challenges/$challenge-id/detail')({
  component: ChallengeDetail,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      challengeType: validateSearchChallengeType(search),
    }
  },
})

function ChallengeDetail() {
  const challengeId = Number(Route.useParams()['challenge-id'])
  const navigate = useNavigate()
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
  const queryClient = useQueryClient()
  const { challengeType } = Route.useSearch()

  const { data: challenge } = useChallenge({ id: challengeId, type: challengeType })

  const { mutate: joinChallenge } = useMutation({
    mutationFn: () =>
      challengesApi.joinChallenge({
        id: challengeId,
        challengeType,
      }),
    onSuccess: () => {
      setOpenSuccessDialog(true)
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.detail({
          id: challengeId,
          challengeType,
        }).queryKey,
      })
    },
    onError(error) {
      console.error(error)
      showMessageIfExists(error)
    },
  })

  const typeKo = challengeType === 'individual' ? '개인' : '팀'

  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <PageLayOut.HeaderSection.BackIcon />
          <PageTitle>{`${typeKo} 챌린지 상세보기`}</PageTitle>
        </PageLayOut.HeaderSection>
        <PageLayOut.BodySection className="gap-3">
          <ChallengeTitle challengeId={challengeId} challengeType={challengeType} />
          <div className="border-lighter-gray-border flex w-full flex-col gap-4 rounded-xl border bg-white p-4 shadow-lg">
            <img
              src={challenge?.challengeImage || DEFAULT_CHALLENGE_IMAGE}
              alt="challenge image"
              className="w-full rounded-xl object-cover"
            />
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-lg font-bold">기본정보</h3>
              <div className="bg-card w-full items-center justify-center p-4 text-start">
                <h4 className="text-card-head mb-2 font-bold">참여방법</h4>
                <p className="text-card-base whitespace-pre-line">{challenge?.challengeContent}</p>
              </div>
              <div className="bg-card w-full items-center justify-center p-4">
                <p className="text-card-head text-start wrap-anywhere whitespace-break-spaces">
                  포인트
                  <br />
                  <span className="text-card-base">
                    {challenge == null ? null : `${challenge.challengePoint}P (1회 인증 기준)`}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <Button
            className="mt-auto"
            onClick={() => {
              joinChallenge()
            }}
          >
            챌린지 참여하기
          </Button>
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
      <Dialog open={openSuccessDialog} onOpenChange={() => setOpenSuccessDialog(false)}>
        <DialogContent className="flex !min-w-60 flex-col gap-3">
          <DialogHeader>
            <DialogTitle className="text-center">챌린지 참여 완료</DialogTitle>
          </DialogHeader>
          <DialogDescription className="!text-light-gray text-center !text-sm">
            [홈] -&gt; [참여 챌린지]에서
            <br />
            챌린지를 인증해보세요!
          </DialogDescription>
          <div className="flex w-full flex-row justify-center">
            <Button size="sm" onClick={() => navigate({ to: '/challenges/user/me/joined' })}>
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayOut.Container>
  )
}

export default ChallengeDetail
