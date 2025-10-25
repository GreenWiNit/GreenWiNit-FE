/** 드래그 가능한 아이템의 위치 */
export interface Position {
  x: number
  y: number
}

/** 나의 꾸미기 아이템 (인벤토리용) */
export interface Item {
  id: number
  name: string
  count: number
  img: React.FC<React.SVGProps<SVGSVGElement>>
}

/** 실제 배치된 아이템 */
export interface PlacedItem {
  id: string
  name: string
  img: React.FC<React.SVGProps<SVGSVGElement>>
  position: Position
}
