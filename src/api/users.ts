import { API_URL } from '@/constant/network'
import { stringify } from '@/lib/query-string'
import { WithDrawnFormState } from '@/types/withdraw'
import { ApiResponse } from '@/types/api'
import { PointFilterType, PointHistory } from '@/types/points'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { showMessageIfExists } from '@/lib/error'

export const usersApi = {
  getUserStatus: async () => {
    const response = await fetch(`${API_URL}/user/mypage`)
    return response.json() as Promise<GetMyInfoResponse>
  },
  getUserPoints: async () => {
    const response = await fetch(`${API_URL}/points/me`)
    return response.json() as Promise<GetMyPointsResponse>
  },
  getUserPointHistory: async (status: PointFilterType | null) => {
    const response = await fetch(
      `${API_URL}/points/transaction?${stringify({
        status,
      })}`,
    )
    return response.json() as Promise<GetMyPointsHistoryResponse>
  },
  putUserProfile: async (nickname: string | null, profileImageUrl: string | null) => {
    return await fetch(`${API_URL}/members/profile`, {
      method: 'PUT',
      body: JSON.stringify({ nickname, profileImageUrl }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<PutUserProfileResponse>)
  },
  checkNicknameDuplicate: async (nickname: string) => {
    return await fetch(`${API_URL}/members/v2/nickname-check`, {
      method: 'POST',
      body: JSON.stringify({ nickname }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<CheckNicknameDuplicateReponse>)
  },
  logout: async () => {
    return fetch(`${API_URL}/auth/v2/logout`, {
      method: 'POST',
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => {
        return res.json() as Promise<ApiResponse<null>>
      })
  },
  signup: async ({
    tempToken,
    nickname,
    profileImageUrl,
  }: {
    tempToken: string
    nickname: string
    profileImageUrl: string | null
  }) => {
    return fetch(`${API_URL}/auth/v2/signup`, {
      method: 'POST',
      body: JSON.stringify({ tempToken, nickname, profileImageUrl }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => {
        return res.json() as Promise<
          ApiResponse<{
            accessToken: string
            memberKey: string
            userName: string
          }>
        >
      })
  },
  withdraw: async ({ reasonTypes, customReason }: WithDrawnFormState) => {
    return fetch(`${API_URL}/members/v2/withdraw`, {
      method: 'POST',
      body: JSON.stringify({ reasonTypes, customReason }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<PostWithdrawResponse>)
      .catch(showMessageIfExists)
  },
  getUserMe: async () => {
    const response = await fetch(`${API_URL}/members/me`)
    return response.json() as Promise<
      | {
          success: false
          message: string
          result: null
        }
      | {
          success: true
          message: string
          result: {
            nickname: string
            email: string
            profileImageUrl: string | null
          }
        }
    >
  },
  getUserGrowth: async () => {
    return await fetch(`${API_URL}/dashboard/growth`)
      .then(throwResponseStatusThenChaining)
      .then(
        (res) =>
          res.json() as Promise<{
            success: true
            message: string
            result: {
              currentLevel: string
              goalLevel: string
              memberId: number
              nextLevelPercent: number
              nextLevelPoint: number
            }
          }>,
      )
      .catch((error) => {
        throw error
      })
  },
  getUserItems: async () => {
    return await fetch(`${API_URL}/dashboard/growth/items`)
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<GetUserItemsResponse>)
      .catch((error) => {
        throw error
      })
  },
}

export type GetUserItemsResponse = ApiResponse<UserItem[]>
export type UserItem = {
  id: number
  itemName: string
  itemImgUrl: string
  applicability: boolean
  positionX: number
  positionY: number
}

type GetMyInfoResponse = ApiResponse<{
  userChallengeCount: number
  userTotalPoints: number
  userLevel: number
}>

type GetMyPointsResponse = ApiResponse<{
  currentBalance: number
  totalEarned: number
  totalSpent: number
}>

type GetMyPointsHistoryResponse = ApiResponse<{
  hasNext: boolean
  nextCursor: number
  content: PointHistory[]
}>

type PostWithdrawResponse = ApiResponse<null>

type PutUserProfileResponse = ApiResponse<{
  nickname: string
  profileImageUrl: string
}>

type CheckNicknameDuplicateReponse = ApiResponse<{
  nickname: string
  available: true
  message: '사용 가능한 닉네임입니다.'
}>

const usersMeKey = createQueryKeys('users/me', {
  member: ['member'],
  status: ['status'],
})

const userPointsKey = createQueryKeys('points', {
  detail: ['detail'],
})

const userPointHistoryKey = createQueryKeys('me/point-history', {
  detail: (status?: PointFilterType | null) => [status ?? undefined] as const,
})

export const usersQueryKeys = mergeQueryKeys(usersMeKey, userPointsKey, userPointHistoryKey)
