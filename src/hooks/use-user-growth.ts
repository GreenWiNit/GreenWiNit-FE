import { usersApi } from '@/api/users'
import { useQuery } from '@tanstack/react-query'

const useUserGrowth = () => {
  return useQuery({
    queryKey: ['use-user-growth'],
    queryFn: () => usersApi.getUserGrowth(),
    retry: false,
  })
}

export default useUserGrowth
