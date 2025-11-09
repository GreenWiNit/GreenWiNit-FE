import { API_URL } from '../constant/network'
import { throwResponseStatusThenChaining } from '../lib/network'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export interface PostElement {
  id: string
  infoCategoryName: string
  title: string
  content: string
  imageUrls: string[]
}

export const postsApi = {
  getPosts: async () => {
    return await fetch(`${API_URL}/user/info`)
      .then(throwResponseStatusThenChaining)
      .then(
        (res) =>
          res.json() as Promise<{
            success: true
            message: string
            result: {
              content: PostElement[]
            }
          }>,
      )
  },
  getPost: async (postId: string) => {
    return fetch(`${API_URL}/user/info/${postId}`)
      .then(throwResponseStatusThenChaining)
      .then(
        (res) =>
          res.json() as Promise<{
            success: true
            message: string
            result: PostElement
          }>,
      )
  },
}

const postsKey = createQueryKeys('posts', {
  list: () => ['list'] as const,
  detail: (postId: string | undefined) => ['detail', postId] as const,
})

export const postsQueryKeys = postsKey
