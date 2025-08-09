import { useQuery } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'

export const useCertifiedChallengeDetails = (certId: number) => {
  const queryKey = challengesQueryKeys.challenges.certifiedDetail({ certId }).queryKey
  const queryFn = () => challengesApi.getCertifiedChallengeDetails(certId)

  const { data } = useQuery({
    queryKey,
    queryFn,
  })

  return {
    data,
  }
}
