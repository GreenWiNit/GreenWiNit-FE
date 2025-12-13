import { useMutation } from '@tanstack/react-query'
import { itemsApi } from '@/api/items'

const useItemOrder = (itemProductId: string, onSuccess: () => void) => {
  return useMutation({
    mutationKey: ['item-order', itemProductId],
    mutationFn: (selectedQuantity: number) =>
      itemsApi.postItemOrder({ itemProductId, selectedQuantity }),
    onSuccess,
  })
}

export default useItemOrder
