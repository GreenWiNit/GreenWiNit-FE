import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { Button } from '@/components/shadcn/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/recommend/analyze')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const handleNextButton = () => {
    navigate({ to: '/challenges/recommend/survey' })
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageTitle>AI 추천 챌린지 분석</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection>
        <div className="flex h-full flex-col items-center justify-center px-8">
          <div className="mb-12 flex flex-col items-center justify-center gap-8 text-center font-bold whitespace-pre-line">
            <p>{`본 설문을 통해 AI를 기반으로\n사용자 맞춤형 챌린지를\n추천해드립니다 🌟`}</p>
            <p>{`AI 추천을 통해 Greenwinit을\n더 알차게 즐겨보세요!`}</p>
          </div>
          <div className="flex w-full items-end justify-end px-4">
            <Button
              className="bg-mountain_meadow-500 items-end rounded-3xl text-white"
              onClick={handleNextButton}
            >
              다음
            </Button>
          </div>
        </div>
      </PageLayOut.BodySection>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}
