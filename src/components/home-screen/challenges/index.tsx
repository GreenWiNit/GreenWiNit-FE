import { useState } from 'react'
import { ChallengePreviewProps } from '@/components/home-screen/challenges/type'
import { useChallenges } from '@/hooks/challenge/use-challenges'
import Challenge from '@/components/common/challenge'
import { useNavigate } from '@tanstack/react-router'
import useIsLoggedIn from '@/hooks/use-is-logged-in'
import WarnNotLoggedIn from '../../common/warn-not-logged-in'
import { Carousel, CarouselContent, CarouselItem } from '@/components/shadcn/carousel'
import { cn } from '@/lib/utils'
import SuggestChallenge from './suggest_challenge'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/shadcn/button'

export const ChallengePreview = ({ category, challenges }: ChallengePreviewProps) => {
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()
  const [isWarnNotLoggedInDialogOpen, setIsWarnNotLoggedInDialogOpen] = useState(false)

  const handleViewButton = (category: 'individual' | 'team') => {
    navigate({
      to: `/challenges`,
      search: { tab: category },
    })
  }

  const handleMakeChallenge = () => {
    navigate({ to: '/challenges/create' })
  }

  return (
    <div>
      <div className="mt-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">
          {category === 'individual' ? '지금 뜨는 개인 챌린지' : '함께하면 더 재밌는 팀 챌린지'}
        </h3>
        <div
          className="text-notify-gray flex cursor-pointer flex-row items-center pr-0 text-sm"
          onClick={() => handleViewButton(category)}
        >
          <span>전체보기</span>
          <ChevronRight color="gray" size={20} />
        </div>
      </div>
      <Carousel className="mt-4">
        {challenges?.length === 0 ? (
          <div className="m-4 flex h-30 w-full flex-col items-center justify-center gap-4">
            <p className="text-ring whitespace-pre-line">{`만들어진 챌린지가 아직 없어요.\n챌린지를 만들어 보세요!`}</p>
            <Button
              className="bg-mountain_meadow-500 font-bold text-white"
              onClick={handleMakeChallenge}
            >
              챌린지 만들러 가기
            </Button>
          </div>
        ) : (
          <CarouselContent className={cn('-ml-4', 'max-w-[200px]')}>
            {challenges?.map((challenge) => (
              <CarouselItem key={challenge.id} className="max-w-[200px] pb-1 pl-4">
                <Challenge
                  challenge={challenge}
                  onClick={() => {
                    if (!isLoggedIn) {
                      setIsWarnNotLoggedInDialogOpen(true)
                      return
                    }
                    navigate({
                      to: `/challenges/${challenge.id}/detail`,
                      search: { challengeType: category },
                    })
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        )}
      </Carousel>
      <WarnNotLoggedIn
        isOpen={isWarnNotLoggedInDialogOpen}
        onOpenChange={setIsWarnNotLoggedInDialogOpen}
      />
    </div>
  )
}

const Challenges = () => {
  const { data: individualChallenges } = useChallenges({ challengeType: 'individual', pageSize: 3 })
  const { data: teamChallenges } = useChallenges({ challengeType: 'team', pageSize: 3 })

  return (
    <div className="flex h-full flex-col">
      <SuggestChallenge />
      <div className="flex w-full flex-[1_1_auto] flex-col px-4 py-0">
        <ChallengePreview category="individual" challenges={individualChallenges} />
        <ChallengePreview category="team" challenges={teamChallenges} />
      </div>
    </div>
  )
}

export default Challenges
