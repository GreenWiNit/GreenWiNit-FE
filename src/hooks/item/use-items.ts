import { useInfiniteQuery } from '@tanstack/react-query'
import { itemsApi, itemsKey } from '@/api/items'

const useItems = (cursorId?: string | number | null) => {
  return useInfiniteQuery({
    queryKey: itemsKey.infinite().queryKey,
    queryFn: ({ pageParam = cursorId }) => itemsApi.getItems(pageParam),
    initialPageParam: cursorId,
    getNextPageParam: (lastPage) =>
      lastPage?.result?.hasNext ? lastPage.result.nextCursor : undefined,
  })
}

export default useItems
