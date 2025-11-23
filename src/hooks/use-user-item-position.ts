import { usersApi } from '@/api/users'
import { PatchUserItemPositionProps } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

const useUserItemPosition = () => {
  return useMutation({
    mutationKey: ['use-user-item-position'],
    mutationFn: ({ itemId, positionX, positionY }: PatchUserItemPositionProps) =>
      usersApi.patchUserItemPosition({ itemId, positionX, positionY }),
  })
}

export default useUserItemPosition
