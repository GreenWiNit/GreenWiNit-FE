import { User } from '@/types/ranking'
import { create } from 'zustand'

interface RankStore {
  users: User[]
}

export const useRankStore = create<RankStore>(() => ({
  users: [
    { name: '사용자1', profile: '', certificates: 20, point: 2640, isMe: false },
    { name: '사용자2', profile: '', certificates: 26, point: 2920, isMe: false },
    { name: '사용자3', profile: '', certificates: 18, point: 2840, isMe: false },
    { name: '사용자4', profile: '', certificates: 22, point: 2500, isMe: false },
    { name: '사용자5', profile: '', certificates: 15, point: 2485, isMe: false },
    { name: '사용자6', profile: '', certificates: 18, point: 3700, isMe: false },
    { name: '사용자7', profile: '', certificates: 24, point: 2900, isMe: false },
    { name: '사용자8', profile: '', certificates: 28, point: 2925, isMe: true },
  ],
}))
