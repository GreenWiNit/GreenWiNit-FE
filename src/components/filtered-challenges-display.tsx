import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { CertifiedChallenges, Challenge as ChallengeType } from '@/api/challenges'
import { ChallengeTypeSwitch } from '@/components/challenge-type-switch'
import { Dispatch, SetStateAction } from 'react'
import Challenge from '@/components/common/challenge'

interface FilteredChallengesDisplayProps {
  challengeType: 0 | 1 // 0 == personal,  1 == team
  setChallengeType: Dispatch<SetStateAction<0 | 1>>
  challenges: ChallengeType[] | CertifiedChallenges[]
  handleNavigate: (challengeId: number, teamId?: number) => void
}

function FilteredChallengesDisplay({
  challengeType,
  setChallengeType,
  challenges,
  handleNavigate,
}: FilteredChallengesDisplayProps) {
  return (
    <section className="flex w-full flex-1 flex-col gap-4 p-4">
      <div className="flex w-fit flex-row items-center justify-center rounded-xl border bg-gray-200">
        <ChallengeTypeSwitch on={challengeType === 0} onClick={() => setChallengeType(0)}>
          개인
        </ChallengeTypeSwitch>
        <ChallengeTypeSwitch on={challengeType === 1} onClick={() => setChallengeType(1)}>
          팀
        </ChallengeTypeSwitch>
      </div>
      <div className="flex h-full flex-row items-start justify-start">
        {challenges?.length ? (
          <Carousel className="w-full">
            <CarouselContent className="-ml-4 items-start justify-start">
              {challenges.map((challenge) => (
                <CarouselItem key={challenge.id} className="max-w-[200px] pb-1 pl-4">
                  <Challenge
                    challenge={challenge}
                    onClick={
                      challengeType === 0
                        ? () => handleNavigate(challenge.id)
                        : () => handleNavigate(challenge.id, 0) //@TODO challenge.teamId 생기면 0이 대체될 예정
                    }
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <p className="w-full self-center text-center text-xl whitespace-pre-line">
            {`[홈]-[${challengeType === 0 ? '개인' : '팀'} 챌린지]에서\n새로운 챌린지에 참여해주세요.`}
          </p>
        )}
      </div>
    </section>
  )
}

export default FilteredChallengesDisplay
