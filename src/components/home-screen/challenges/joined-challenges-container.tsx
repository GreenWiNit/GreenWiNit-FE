import { useNavigate } from 'react-router-dom'
import { useJoinedChallenges } from '@/hooks/challenge/use-joined-challenges'
import FilteredChallengesDisplay from '@/components/filtered-challenges-display'

function JoinedChallengesContainer() {
  const navigate = useNavigate()
  const { challengeType, setChallengeType, data } = useJoinedChallenges()
  if (!data) return <div>데이터 불러오는 중...</div>

  const challenges = data.result?.content
  if (!challenges) return <div>챌린지에 참여해주세요.</div>

  const isPersonal = challengeType === 0
  const handleNavigate = (challengeId: number, teamId?: number) => {
    if (isPersonal) navigate(`/challenges/${challengeId}/submit/individual`)
    else navigate(`/challenges/${challengeId}/submit/teams/${teamId}`)
  }

  return (
    <FilteredChallengesDisplay
      challengeType={challengeType}
      setChallengeType={setChallengeType}
      challenges={challenges}
      handleNavigate={handleNavigate}
    />
  )
}

export default JoinedChallengesContainer
