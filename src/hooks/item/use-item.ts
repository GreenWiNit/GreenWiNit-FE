import { useQuery } from '@tanstack/react-query'
import { itemsApi, itemsKey } from '@/api/items'

const useItem = (itemProductId: string | undefined) => {
  return useQuery({
    queryKey: itemsKey.detail(itemProductId).queryKey,
    queryFn: () => itemsApi.getItemDetail(itemProductId),
  })
}

export default useItem
