import { usersApi, usersQueryKeys } from '@/api/users'
import { useUserStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'

export const useUserStatus = () => {
  const user = useUserStore((s) => s.user)

  return useQuery({
    queryKey: usersQueryKeys['me/status'].detail(user?.id).queryKey,
    queryFn: usersApi.getUserStatus,
  })
}
