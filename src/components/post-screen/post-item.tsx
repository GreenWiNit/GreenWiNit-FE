import { useNavigate } from '@tanstack/react-router'
import CategoryName from './category-name'

interface PostItemProps {
  id: string
  categoryName: string
  title: string
  content: string
  thumbnailUrl: string | undefined
  onClick?: () => void
}

const PostItem = ({ id, categoryName, title, content, thumbnailUrl, onClick }: PostItemProps) => {
  const navigate = useNavigate()

  const handleClickCard = () => {
    if (onClick) {
      onClick()
      return
    }

    navigate({
      to: '/posts/$id',
      params: { id },
    })
  }

  return (
    <div
      className="flex h-36 w-full cursor-pointer flex-row items-start justify-start overflow-clip rounded-lg border bg-white shadow-md"
      onClick={handleClickCard}
    >
      <div className="h-36 w-36 flex-shrink-0">
        <img
          className="object-fit h-full w-full rounded-l-lg bg-green-50"
          src={thumbnailUrl}
          alt="활동썸네일"
        />
      </div>
      <div className="flex h-36 flex-1 flex-col justify-center overflow-hidden p-2">
        <div className="flex flex-row items-center justify-between pb-2">
          <p className="flex-1 truncate pr-2 text-start text-base font-bold">{title}</p>
          <CategoryName category={categoryName} />
        </div>
        <div className="flex-1 overflow-hidden py-2">
          <p className="line-clamp-3 text-start text-base text-gray-600">{content}</p>
        </div>
      </div>
    </div>
  )
}

export default PostItem
