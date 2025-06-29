import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useQuery } from '@tanstack/react-query'

export const useChallenges = () => {
  return useQuery({
    queryKey: challengesQueryKeys.list().queryKey,
    queryFn: challengesApi.getChallenges,
  })
}
