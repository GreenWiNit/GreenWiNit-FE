import { usersApi } from '@/api/users'
import { useQuery } from '@tanstack/react-query'

const useUserItems = () => {
  return useQuery({
    queryKey: ['use-user-items'],
    queryFn: () => usersApi.getUserItems(),
    retry: false,
  })
}

export default useUserItems
