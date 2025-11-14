import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { AiRecommendationSurvey } from '../../../components/common/serveyConfig'
import SurveyStep from '@/components/challenge-screen/survey-step'
import { Button } from '@/components/shadcn/button'
import TitleImg from '@/../public/img/og-image.png'

export const Route = createFileRoute('/challenges/recommend/survey')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(0)
  const [surveyData, setSurveyData] = useState<Record<string, (number | string)[]>>({})

  const totalStep = AiRecommendationSurvey.steps.length
  const currentStepConfig = AiRecommendationSurvey.steps[currentStep]

  if (!currentStepConfig) {
    navigate({ to: '/500' })
    return null
  }

  const currentStepData = surveyData[currentStepConfig.id] || []
  const isCurrentStepEmpty = currentStepData.length === 0

  if (!currentStepConfig) {
    navigate({ to: '/500' })
    return
  }

  const handleUpdate = (stepId: string, data: (number | string)[]) => {
    setSurveyData((prev) => ({
      ...prev,
      [stepId]: data,
    }))
  }

  const handleViewResult = () => {
    navigate({ to: '/challenges/recommend/report' })
  }

  const handleNext = () => {
    if (currentStep < totalStep - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleViewResult()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleBackStart = () => {
    window.history.back()
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageTitle>
          <img src={TitleImg} className="w-[280px]" />
        </PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection>
        <div className="mt-8 mb-12 h-1 w-full rounded-[9px] bg-gray-200">
          <div
            className="bg-mountain_meadow-500 h-full rounded-[9px] transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalStep) * 100}%` }}
          />
        </div>
        <div className="flex flex-col items-start justify-center px-8">
          <SurveyStep
            stepConfig={currentStepConfig}
            data={surveyData[currentStepConfig.id] || []}
            onUpdate={(data) => handleUpdate(currentStepConfig.id, data)}
          />
        </div>
        <div className="mt-6 flex items-center justify-between px-8">
          <Button
            onClick={currentStep > 0 ? handlePrev : handleBackStart}
            className="bg-button-gray rounded-3xl border border-gray-300 px-4 py-2 text-gray-700"
          >
            이전
          </Button>
          <Button
            onClick={handleNext}
            className="bg-mountain_meadow-500 rounded-3xl px-4 py-2 text-white"
            disabled={isCurrentStepEmpty}
          >
            {currentStep === totalStep - 1 ? '결과보기' : '다음'}
          </Button>
        </div>
      </PageLayOut.BodySection>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}
