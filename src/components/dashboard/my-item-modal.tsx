import { UserItem } from '@/api/users'
import { XIcon, Info } from 'lucide-react'

interface MyItemModalProps {
  toggleItemModal: () => void
  itemList: UserItem[]
  /** 배치중인 아이템 list에 추가 함수 */
  handlePlaceItem: (itemId: number) => void
}
const MyItemModal = ({ toggleItemModal, itemList, handlePlaceItem }: MyItemModalProps) => {
  return (
    <div className="absolute inset-x-3.5 inset-y-4 z-50 rounded-2xl bg-[rgba(255,255,255,0.9)] p-3.5">
      <header className="relative">
        <h2 className="text-[18px] font-semibold text-[#111827]">나의 아이템</h2>
        <XIcon
          onClick={toggleItemModal}
          className="absolute top-0 right-0 cursor-pointer rounded-[2px] border-2 border-[#737373] text-[#737373]"
        />
      </header>

      {!itemList || itemList.length === 0 ? (
        //보유한 아이템 없음
        <div className="flex h-full w-full items-center justify-center">
          <p className="items-cetner flex justify-center gap-2 text-[#A0A0A0]">
            <Info />
            포인트 상점에서 아이템을 교환해보세요!
          </p>
        </div>
      ) : (
        //아이템 리스트
        <ul className="grid grid-cols-4 gap-4 pt-5">
          {itemList.map(({ id, itemImgUrl: Img }) => (
            <li
              key={id + Img}
              onClick={() => handlePlaceItem(id)}
              className="border-lighter-gray-border hover:bg-mountain_meadow relative h-[65px] w-[66px] cursor-pointer rounded-[12px] border bg-white shadow-md"
            >
              <div className="flex h-full w-full items-center justify-center">
                <img src={Img} className="h-full w-full p-2.5" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyItemModal
