import { API_URL } from '@/constant/network'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const itemsApi = {
  getItems: async (cursorId?: number | null) => {
    const url = cursorId ? `${API_URL}/point-items?cursor=${cursorId}` : `${API_URL}/point-items`

    return await fetch(url)
      .then(throwResponseStatusThenChaining)
      .then(
        (res) =>
          res.json() as Promise<{
            success: true
            message: string
            result: {
              hasNext: boolean
              nextCursor: number | null
              content: ServerItems[]
            }
          }>,
      )
  },
}

export const itemsKey = createQueryKeys('items', {
  list: () => ['list'] as const,
  detail: (id: string | undefined) => ['detail', id] as const,
  infinite: () => ['infinite'] as const,
})

export type ServerItems = {
  pointItemId: number
  pointItemName: string
  thumbnailUrl: string
  pointPrice: number
}
