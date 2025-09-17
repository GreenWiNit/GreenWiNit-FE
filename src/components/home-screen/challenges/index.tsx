import { useState } from 'react'
import { TabProps } from '@/components/home-screen/challenges/type'
import { useChallenges } from '@/hooks/challenge/use-challenges'
import Challenge from '@/components/common/challenge'
import { useNavigate } from '@tanstack/react-router'
import useIsLoggedIn from '@/hooks/use-is-logged-in'
import WarnNotLoggedIn from '../../common/warn-not-logged-in'
import { Carousel, CarouselContent, CarouselItem } from '@/components/shadcn/carousel'
import { cn } from '@/lib/utils'
import ChallengeTab from '@/components/common/challenges/challenge-tab'
import InfoButton from './info-button'
import SuggestChallenge from './suggest_challenge'

const Challenges = () => {
  const [tab, setTab] = useState<TabProps['tab']>('individual')
  const { data: challenges } = useChallenges({ challengeType: tab })
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()
  const [isWarnNotLoggedInDialogOpen, setIsWarnNotLoggedInDialogOpen] = useState(false)
  const filteredChallenges = challenges

  return (
    <div className="flex h-full flex-col">
      <SuggestChallenge />
      <ChallengeTab tab={tab} setTab={setTab} />
      <div className="flex h-0 w-full flex-[1_1_auto] flex-col p-4 pt-8">
        <div className="flex flex-row items-center gap-1">
          <span className="text-title-smaller text-xl font-bold">{`${tab === 'individual' ? '개인' : '팀'} 챌린지`}</span>
          <InfoButton
            text={`원하는 챌린지에 참여 후
                  [참여 챌린지]에서 인증해주세요!`}
          />
        </div>
        <Carousel className="mt-4">
          <CarouselContent className={cn('-ml-4', 'max-w-[200px]')}>
            {filteredChallenges?.map((challenge) => (
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
                      search: { challengeType: tab },
                    })
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <WarnNotLoggedIn
        isOpen={isWarnNotLoggedInDialogOpen}
        onOpenChange={setIsWarnNotLoggedInDialogOpen}
      />
    </div>
  )
}

export default Challenges
