import { useState } from 'react'
import Tab from '@/components/home-screen/Challenges/Tab'
import { TabProps } from '@/components/home-screen/Challenges/type'
import { useChallenges } from '@/hooks/useChallenges'
import Challenge from '@/components/common/Challenge'
import { useNavigate } from 'react-router-dom'

const Challenges = () => {
  const [tab, setTab] = useState<TabProps['tab']>('individual')
  const tabToType = tab === 'individual' ? 0 : 1
  const { data: challenges } = useChallenges()
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col">
      <Tab tab={tab} setTab={setTab} />
      <div className="flex h-0 w-full flex-[1_1_auto] flex-col p-4 pt-8">
        <div className="flex flex-row gap-1">
          <span className="text-xl font-bold text-[#404040]">{`${tab === 'individual' ? '개인' : '팀'} 챌린지`}</span>
          <img src="/icons/infocircle.svg" />
        </div>
        {/* @TODO: 실수로 y축 스크롤 적용함 다시 x축으로 변경작업 필요 */}
        <div className="mt-4 flex flex-[1_1_auto] flex-row flex-wrap gap-4 overflow-y-auto">
          {challenges
            ?.filter((c) => c.type === tabToType)
            .map((challenge) => (
              <Challenge
                key={challenge.id}
                challenge={challenge}
                onClick={() => {
                  if (challenge.type === 0) {
                    navigate(`/challenges/detail/${challenge.id}`)
                    return
                  }

                  // @TODO: 팀 챌린지 클릭시 이벤트 처리
                }}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Challenges
