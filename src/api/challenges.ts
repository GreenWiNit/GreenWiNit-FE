import { createQueryKeys } from '@lukemorales/query-key-factory'

export const challengesApi = {
  getChallenges: async () => {
    const response = await fetch('/api/v1/challenges')
    return response.json() as Promise<Challenge[]>
  },
  getJoinedChallengesMine: async () => {
    const response = await fetch('/api/v1/challenges/user/me/joined')
    return response.json() as Promise<Challenge[]>
  },
  getChallengeDetail: async (id: string | undefined) => {
    const response = await fetch(`/api/v1/challenges/${id}`)
    return response.json() as Promise<Challenge>
  },
}

export interface Challenge {
  id: string
  type: 0 | 1
  typeKo: '개인' | '팀'
  name: string
  /**
   * @deprecated
   * howToJoin하고 description 중 하나만 사용할 수도 있음..
   */
  description: string
  howToJoin: string
  startAt: string
  endAt: string
  status: 0 | 1 | 2
  statusKo: '모집중' | '진행중' | '종료'
  thumbnailUrl: string
  participants: {
    id: string
    name: string
  }[]
  point: number
}

const challengesKey = createQueryKeys('challenges', {
  list: () => ['list'] as const,
  listJoinedMine: () => ['list/joined/mine'] as const,
  detail: (id: string | undefined) => ['detail', id] as const,
})

export const challengesQueryKeys = challengesKey
