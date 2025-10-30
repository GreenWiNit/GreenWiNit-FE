import { XIcon } from 'lucide-react'
import Lv1 from '@/components/dashboard/lv1.svg?react'
import Lv2 from '@/components/dashboard/lv2.svg?react'
import Lv3 from '@/components/dashboard/lv3.svg?react'
import Lv4 from '@/components/dashboard/lv4.svg?react'

interface MyItemModalProps {
  toggleItemModal: () => void
}
const MyItemModal = ({ toggleItemModal }: MyItemModalProps) => {
  const itemList = [
    { id: 1, name: '아이템1', count: 2, img: Lv1 },
    { id: 2, name: '아이템2', count: 2, img: Lv2 },
    { id: 3, name: '아이템3', count: 1, img: Lv3 },
    { id: 4, name: '아이템4', count: 1, img: Lv4 },
    { id: 5, name: '아이템4', count: 1, img: Lv4 },
    { id: 6, name: '아이템4', count: 1, img: Lv4 },
  ]
  return (
    <div className="absolute inset-x-3.5 inset-y-4 rounded-2xl bg-[rgba(255,255,255,0.9)] p-3.5">
      <header className="relative">
        <h2 className="text-[18px] font-semibold text-[#111827]">나의 아이템</h2>
        <XIcon
          onClick={toggleItemModal}
          className="absolute top-0 right-0 cursor-pointer rounded-[2px] border-2 border-[#737373] text-[#737373]"
        />
      </header>

      {/* 아이템 리스트 */}
      <ul className="grid grid-cols-4 gap-4 pt-5">
        {itemList.map(({ id, count, img: Img }) => (
          <li
            key={id}
            className="border-lighter-gray-border hover:bg-mountain_meadow relative h-[65px] w-[66px] cursor-pointer rounded-[12px] border bg-white shadow-md"
          >
            <div className="flex h-full w-full items-center justify-center">
              <Img className="w-10" />
            </div>
            <span className="absolute right-2 bottom-1 text-[10px] text-[#737373]">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyItemModal
