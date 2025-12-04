import { memo, useRef } from 'react'
import Draggable, { DraggableData } from 'react-draggable'

interface DecorationItemProps {
  Img: string
  x: number
  y: number
  handlePlacedItemList: (x: number, y: number) => void
  handleDragStart: () => void
  index: number
  isActive: boolean
  imgSize?: number
}

const DecorationItem = ({
  Img,
  x,
  y,
  handlePlacedItemList,
  handleDragStart,
  index,
  isActive,
  imgSize,
}: DecorationItemProps) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      defaultPosition={{ x, y }}
      enableUserSelectHack={false} //드래그 시 텍스트 선택 방지 해제
      onStop={(_, data: DraggableData) => {
        handlePlacedItemList(data.x, data.y)
      }}
      onStart={handleDragStart}
    >
      <div
        ref={nodeRef}
        className="absolute cursor-grab hover:cursor-[url('/icons/move-cursor.png')_16_16,grab]"
        style={{ zIndex: isActive ? 11 : index + 1 }}
      >
        <img
          src={Img}
          width={imgSize}
          height={imgSize}
          className="pointer-events-none select-none"
        />
      </div>
    </Draggable>
  )
}

export default memo(DecorationItem)
