import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ApiServerMockingState {
  users: [
    {
      id: string
      name: string
      email: string
      point: number
      challengeCount: number
      level: {
        name: string
        code: number
        exp: number
        nextLevelExp: number
      }
    },
  ]
}

export const apiServerMockingStore = create<ApiServerMockingState>()(
  devtools(
    persist(
      (_set) => ({
        users: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            point: 1500,
            challengeCount: 35,
            level: {
              name: 'Silver',
              code: 2,
              exp: 2300,
              nextLevelExp: 3000,
            },
          },
        ],
      }),
      {
        name: 'user',
      },
    ),
  ),
)
