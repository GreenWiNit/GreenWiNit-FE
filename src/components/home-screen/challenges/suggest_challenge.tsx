import { Button } from '@/components/shadcn/button'
import InfoButton from './info-button'
import { useChallenges } from '@/hooks/challenge/use-challenges'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import useIsLoggedIn from '@/hooks/use-is-logged-in'
import WarnNotLoggedIn from '@/components/common/modal/warn-not-logged-in'

const Slider = () => {
  const { data: teamChallenges } = useChallenges({ challengeType: 'individual' })
  const { data: individualChallenges } = useChallenges({ challengeType: 'team' })

  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isWarnNotLoggedInDialogOpen, setIsWarnNotLoggedInDialogOpen] = useState(false)
  const isLoading = !teamChallenges || !individualChallenges

  const latestChallenges = useMemo(() => {
    const allChallenges = [...(teamChallenges ?? []), ...(individualChallenges ?? [])]
    const sortedChallenges = allChallenges.sort(
      (a, b) => new Date(b.beginDate).getTime() - new Date(a.beginDate).getTime(),
    )
    return sortedChallenges.slice(0, 3)
  }, [teamChallenges, individualChallenges])

  useEffect(() => {
    if (latestChallenges.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIdx) => (prevIdx === latestChallenges.length - 1 ? 0 : prevIdx + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [latestChallenges.length])

  const SkeletonSlide = () => (
    <div className="mt-4 flex w-full animate-pulse rounded-lg border-2 bg-gray-200">
      <div className="flex h-48 w-full items-center justify-center text-center">
        <p className="text-ring text-center">추천 챌린지가 준비중이에요.</p>
      </div>
    </div>
  )

  if (isLoading || latestChallenges.length === 0) {
    return <SkeletonSlide />
  }

  return (
    <div className="flex">
      <div className="relative h-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {latestChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="relative mt-4 w-full flex-shrink-0"
              onClick={() => {
                if (!isLoggedIn) {
                  setIsWarnNotLoggedInDialogOpen(true)
                  return
                }
                navigate({
                  to: `/challenges/${challenge.id}/detail`,
                })
              }}
            >
              <img src={challenge.challengeImage} className="rounded-lg border-2" />
              <div className="flex items-start justify-between">
                <div className="bg-opacity-30 absolute top-5/6 right-2 rounded-lg border-2 bg-white px-2 text-xs">
                  {currentIndex + 1} / {latestChallenges.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WarnNotLoggedIn
        isOpen={isWarnNotLoggedInDialogOpen}
        onOpenChange={setIsWarnNotLoggedInDialogOpen}
      />
    </div>
  )
}

const SuggestChallenge = () => {
  const navigate = useNavigate()

  const suggestString = `
          AI가 사용자 맞춤형
          챌린지를 추천해줘요!
          미설정 시, 최신 등록된 챌린지를
          보여줘요.
        `

  const handleButtonClick = () => {
    navigate({ to: '/challenges/recommend/analyze' })
  }

  return (
    <div className="flex h-full flex-col px-4 py-0">
      <div className="flex w-full flex-row items-center gap-2">
        <h3 className="text-lg font-bold whitespace-nowrap">맞춤 추천 챌린지</h3>
        <InfoButton text={suggestString} />
        <Button
          className="flex-end bg-mountain_meadow-500 ml-12 justify-end font-bold text-white"
          variant="default"
          onClick={handleButtonClick}
        >
          AI분석 바로가기
        </Button>
      </div>
      <Slider />
    </div>
  )
}

export default SuggestChallenge
