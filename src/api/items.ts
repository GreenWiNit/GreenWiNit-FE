import { API_URL } from '@/constant/network'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { ServerItem, ServerItems } from '@/types/item'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const itemsApi = {
  getItems: async (cursorId?: string | number | null) => {
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
  getItemDetail: async (itemProductId: string | undefined) => {
    const response = await fetch(`${API_URL}/point-items/${itemProductId}`)
      .then(throwResponseStatusThenChaining)
      .then(
        (res) =>
          res.json() as Promise<{
            success: true
            message: string
            result: ServerItem
          }>,
      )
      .catch((error) => {
        console.error('Error fetching item detail:', error)
        throw error // Re-throw the error after logging it
      })

    return response.result
  },
  postItemOrder: async (itemProductId: string) => {
    const idempotencyKey = crypto.randomUUID()

    return await fetch(`${API_URL}/point-items/order/${itemProductId}`, {
      method: 'POST',
      headers: {
        'Idempotency-Key': idempotencyKey,
      },
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json())
      .catch((error) => {
        throw error
      })
  },
}

export const itemsKey = createQueryKeys('items', {
  list: () => ['list'] as const,
  detail: (id: string | undefined) => ['detail', id] as const,
  infinite: () => ['infinite'] as const,
})
