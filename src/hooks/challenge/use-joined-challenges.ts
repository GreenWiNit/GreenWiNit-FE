import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'

export const useJoinedChallenges = () => {
  const [challengeType, setChallengeType] = useState<0 | 1>(0)
  const challengeTypeString = challengeType === 0 ? 'individual' : 'team'

  const queryKey = challengesQueryKeys.challenges.listJoinedMine({
    challengeType: challengeTypeString,
  }).queryKey

  const queryFn = () =>
    challengesApi.getJoinedChallengesMine({
      challengeType: challengeTypeString,
      cursor: null,
    })

  const { data } = useQuery({
    queryKey,
    queryFn,
  })

  return {
    challengeType,
    setChallengeType,
    challengeTypeString,
    data,
  }
}
