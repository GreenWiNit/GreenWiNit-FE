import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import BottomNavigation from '@/components/common/BottomNav'
import Challenge from '@/components/common/Challenge'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import { cn } from '@/lib/utils'
import BackIcon from '@mui/icons-material/ChevronLeft'
import { useQuery } from '@tanstack/react-query'
import { cva, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const JoinedChallenges = () => {
  const [challengeType, setChallengeType] = useState<0 | 1>(0)
  const navigate = useNavigate()

  const { data: challenges } = useQuery({
    queryKey: challengesQueryKeys.listJoinedMine().queryKey,
    queryFn: challengesApi.getJoinedChallengesMine,
  })
  const filteredChallenges = challenges?.filter((c) => c.type === challengeType)

  return (
    <PageContainer>
      <PageHeaderSection>
        <BackIcon
          className="absolute left-4 cursor-pointer"
          fontSize="large"
          onClick={() => navigate(-1)}
        />
        <PageTitle>참여 챌린지</PageTitle>
      </PageHeaderSection>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex w-fit flex-row items-center justify-center rounded-xl border bg-gray-200">
          <ChallengeTypeSwitch on={challengeType === 0} onClick={() => setChallengeType(0)}>
            개인
          </ChallengeTypeSwitch>
          <ChallengeTypeSwitch on={challengeType === 1} onClick={() => setChallengeType(1)}>
            팀
          </ChallengeTypeSwitch>
        </div>
        <div className="flex flex-row items-center justify-center">
          {filteredChallenges?.length ? (
            <div className="flex-start flex w-full flex-row flex-wrap gap-4">
              {filteredChallenges.map((challenge) => (
                <Challenge
                  key={challenge.id}
                  challenge={challenge}
                  // 팀 챌린지는 팀 선택페이지로 이동
                  onClick={() => {
                    if (challenge.type === 0) {
                      navigate(`/challenges/submit/${challenge.id}`)
                    } else {
                      // @TODO fix it
                      navigate(`/challenges/team/select/${challenge.id}`)
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-center whitespace-pre-line">
              {`[홈]-[${challengeType === 0 ? '개인' : '팀'} 챌린지]에서\n새로운 챌린지에 참여해주세요.`}
            </p>
          )}
        </div>
      </div>
      <BottomNavigation />
    </PageContainer>
  )
}

const challengeTypeSwitchVariants = cva('px-3 py-0.5 cursor-pointer border min-w-12', {
  variants: {
    on: {
      true: 'border-mountain_meadow rounded-xl',
      false: 'text-gray-500 border-transparent',
    },
  },
  defaultVariants: {
    on: false,
  },
})

type ChallengeTypeSwitchProps = VariantProps<typeof challengeTypeSwitchVariants> &
  React.HTMLAttributes<HTMLDivElement>

const ChallengeTypeSwitch = ({ className, on, ...props }: ChallengeTypeSwitchProps) => {
  return <div className={cn(challengeTypeSwitchVariants({ on }), className)} {...props}></div>
}

export default JoinedChallenges
