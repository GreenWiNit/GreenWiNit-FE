import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

export const usersApi = {
  getUserStatus: async () => {
    const response = await fetch('/api/v1/users/me/status')
    return response.json() as Promise<UserStatus>
  },
  login: async ({ oAuthToken }: { oAuthToken: string }) => {
    return await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ oAuthToken }),
    })
  },
}

export interface UserStatus {
  point: number
  challengeCount: number
  level: {
    name: string
    code: number
    exp: number
    nextLevelExp: number
  }
}

const usersKey = createQueryKeys('users')
const userMeStatusKey = createQueryKeys('me/status', {
  detail: (userId?: string) => [userId] as const,
})

export const usersQueryKeys = mergeQueryKeys(usersKey, userMeStatusKey)
