import { Button } from '@/components/shadcn/button'
import InfoButton from './info-button'
import { useChallenges } from '@/hooks/challenge/use-challenges'
import { useEffect, useMemo, useState } from 'react'

const Slider = () => {
  const { data: teamChallenges } = useChallenges({ challengeType: 'individual' })
  const { data: individualChallenges } = useChallenges({ challengeType: 'team' })

  const [currentIndex, setCurrentIndex] = useState(0)

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

  return (
    <div className="flex">
      <div className="relative h-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {latestChallenges.map((challenge) => (
            <div key={challenge.id} className="relative mt-4 w-full flex-shrink-0">
              <img src={challenge.challengeImage} className="rounded-lg border-2" />
              <div className="mb-4 flex items-start justify-between">
                <div className="bg-opacity-30 absolute top-4/5 right-2 rounded-lg border-2 bg-white px-2 text-xs">
                  {currentIndex + 1} / {latestChallenges.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SuggestChallenge = () => {
  const suggestString = `
          AI가 사용자 맞춤형
          챌린지를 추천해줘요!
          미설정 시, 최신 등록된 챌린지를
          보여줘요.
        `

  return (
    <div className="flex h-full flex-col px-4 py-0">
      <div className="flex w-full flex-row items-center gap-2">
        <h3 className="text-lg font-bold">맞춤 추천 챌린지</h3>
        <InfoButton text={suggestString} />
        <Button
          className="flex-end bg-mountain_meadow-500 ml-12 justify-end font-bold text-white"
          variant="default"
        >
          AI분석 바로가기
        </Button>
      </div>
      <Slider />
    </div>
  )
}

export default SuggestChallenge
