import Lv1 from '@/components/dashboard/roadmap/lv1.png'
import Lv2 from '@/components/dashboard/roadmap/lv2.png'
import Lv3 from '@/components/dashboard/roadmap/lv3.png'
import Lv4 from '@/components/dashboard/roadmap/lv4.png'

export interface LevelInfoType {
  id: number
  name: string
  img: string
  point: number
  engName: string
}

const levelsInfo: LevelInfoType[] = [
  { id: 1, name: '흙', img: Lv1, point: 0, engName: 'SOIL' },
  { id: 2, name: '새싹', img: Lv2, point: 500, engName: 'SPROUT' },
  { id: 3, name: '묘목', img: Lv3, point: 1000, engName: 'SAPLING' },
  { id: 4, name: '나무', img: Lv4, point: 3000, engName: 'TREE' },
]
export default levelsInfo
