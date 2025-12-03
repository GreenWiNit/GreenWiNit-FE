import { usersApi } from '@/api/users'
import { queryClient } from '@/constant/globals'
import { PatchUserItemPositionProps } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

const useUserItemPosition = () => {
  return useMutation({
    mutationKey: ['use-user-item-position'],
    mutationFn: ({ itemId, positionX, positionY }: PatchUserItemPositionProps) =>
      usersApi.patchUserItemPosition({ itemId, positionX, positionY }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['use-user-items'] })
    },
  })
}

export default useUserItemPosition
