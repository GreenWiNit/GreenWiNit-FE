import { Challenge } from '@/api/challenges'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ApiServerMockingState {
  users: Array<{
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
  }>
  challenges: Challenge[]
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
        challenges: [
          {
            id: '1',
            type: 0,
            typeKo: '개인',
            name: '오늘은 따릉이 타는날',
            description: '따릉이 타는 날 챌린지',
            startAt: '2025-08-01',
            endAt: '2025-08-31',
            status: 0,
            statusKo: '모집중',
            thumbnailUrl:
              'https://fastly.picsum.photos/id/661/300/200.jpg?hmac=zVBnVXYPtDskXZnJWjGoYK2R3XwvZJ5ez3ObA07jFSU',
            participants: [],
            howToJoin: '자전거를 타고 출발하세요.',
            point: 100,
          },
          {
            id: '2',
            type: 1,
            typeKo: '팀',
            name: '단체 라이딩',
            description: '단체 라이딩 챌린지',
            startAt: '2025-08-01',
            endAt: '2025-08-31',
            status: 0,
            statusKo: '모집중',
            thumbnailUrl:
              'https://fastly.picsum.photos/id/1065/300/200.jpg?hmac=znixKcDX1Ou6rY0EYrczUpfu64rFKBrkiHlNKBhx2Kw',
            participants: [],
            howToJoin: '다같이 모여 자전거를 타고 출발하세요.',
            point: 200,
          },
          {
            id: '3',
            type: 0,
            typeKo: '개인',
            name: '비닐 대신 에코백',
            description: '비닐 대신 에코백 챌린지',
            startAt: '2025-07-01',
            endAt: '2025-07-31',
            status: 0,
            statusKo: '모집중',
            thumbnailUrl:
              'https://fastly.picsum.photos/id/626/300/200.jpg?hmac=CV2IH1nRl4I_gBb9i-gy8QzKwxWYuzHXNvPe251LTAo',
            participants: [{ id: '1', name: 'John Doe' }],
            howToJoin: '비닐 대신 에코백을 사용하세요.',
            point: 300,
          },
        ],
      }),
      {
        name: 'user',
      },
    ),
  ),
)
