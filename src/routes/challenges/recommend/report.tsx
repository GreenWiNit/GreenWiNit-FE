import BottomNavigation from '@/components/common/bottom-navigation'
import Challenge from '@/components/common/challenge'
import Loading from '@/components/common/loading'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { useChallenges } from '@/hooks/challenge/use-challenges'
import { createFileRoute } from '@tanstack/react-router'
import { CirclePlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/challenges/recommend/report')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(true)
  const { data: challenges } = useChallenges({ challengeType: 'team' })
  const recommendedChallenges = challenges?.slice(0, 2)

  const AddRecommandChallenge = () => {
    toast.error('추천 챌린지 생성을 아직은 할 수 없어요!')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageTitle>AI 추천 챌린지 분석 결과</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.ScrollableContent>
        {isLoading ? (
          <Loading
            size="md"
            text={`AI 분석 및 추천 챌린지를 생성중이에요!\n잠시만 기다려 주세요.`}
          />
        ) : (
          <>
            <div className="m-4 px-4 py-2">
              <div className="border-mountain_meadow-100 flex flex-col items-center justify-center gap-2 rounded-3xl border-8 px-4 py-2">
                <p className="text-ring text-sm">{mockingRecommandData.title}</p>
                <p className="text-xl font-bold">{mockingRecommandData.type}</p>
                <img src={mockingRecommandData.thumbnail} className="h-36 w-36" />
                <p className="text-ring text-xs whitespace-pre-line">
                  {mockingRecommandData.description}
                </p>
                <span className="bg-mountain_meadow-300 text-mountain_meadow-700 rounded-lg p-2 text-xs font-bold">
                  # {mockingRecommandData.introduction}
                </span>
              </div>
            </div>
            <div className="px-4">
              <hr className="border-b-2" />
            </div>
            <div className="m-2 mx-4 gap-2 border-b-2">
              <p className="mb-2 font-bold">AI 추천 챌린지</p>
              <p className="text-ring text-sm">홈 화면에서 매일 추천 챌린지가 바뀝니다!</p>
              <div className="my-4 flex flex-row items-center gap-2">
                {recommendedChallenges?.map((challenge) => (
                  <Challenge challenge={challenge} key={challenge.id} />
                ))}
              </div>
            </div>
            <div className="mx-4 gap-2">
              <p className="mb-2 font-bold">직접 챌린지를 만들어보세요!</p>
              <p className="text-ring mb-2 text-sm">개인 또는 팀 챌린지를 직접 생성할 수 있어요.</p>
              <div className="mb-4 flex flex-col gap-2">
                {mockingRecommandChallenge.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="flex flex-col justify-baseline gap-2 rounded-lg border p-4"
                  >
                    <div className="flex justify-between text-sm font-bold">
                      <span>{challenge.title}</span>
                      <span>
                        <CirclePlus color="#0fba7e" onClick={AddRecommandChallenge} />
                      </span>
                    </div>
                    <p className="text-ring text-start text-xs">{challenge.subTitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

interface RecommendData {
  title: string
  type: string
  thumbnail: string
  description: string
  introduction: string
}

const mockingRecommandData: RecommendData = {
  title: `"슬슬 환경 보호에 시동 거는 중!"`,
  type: '잠재적 챌린저',
  thumbnail: '/img/presentation.png',
  description: `환경 보호에 대한 관심이 시작 단계이시군요.\n부담 없이 즐길 수 있는 쉬운 챌린지부터 시작해보세요!`,
  introduction: '시작이 반이다',
}

interface RecommendChallenge {
  id: number
  title: string
  subTitle: string
}

const mockingRecommandChallenge: RecommendChallenge[] = [
  {
    id: 1,
    title: '미니멀 라이프 챌린지',
    subTitle: '매일 불필요한 물건 하나씩 정리하기',
  },
  {
    id: 2,
    title: '디지털 디톡스',
    subTitle: '하루 2시간 스마트폰 없이 지내기',
  },
]
