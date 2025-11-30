import { usersApi } from '@/api/users'
import { queryClient } from '@/constant/globals'
import { useMutation } from '@tanstack/react-query'

const useUserItemApplicatbility = () => {
  return useMutation({
    mutationKey: ['use-user-item-applicatbility'],
    mutationFn: (itemId: number) => usersApi.patchUserItemApplicability(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['use-user-items'] })
    },
  })
}

export default useUserItemApplicatbility
