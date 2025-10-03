import { cn } from '@/lib/utils'

type CategoryNameProps = {
  category: string
}

const CategoryName = ({ category }: CategoryNameProps) => {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-sm px-2 py-1 text-sm',
        category === '이벤트' && 'bg-[#E3F2FD] text-[#1976D2]',
        category === '콘텐츠' && 'bg-[#FFF8E1] text-[#FFA000]',
        category === '기타' && 'bg-[#F3E5F5] text-[#9C27B0]',
      )}
    >
      {category}
    </div>
  )
}

export default CategoryName
