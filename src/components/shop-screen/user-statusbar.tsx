import { useNavigate } from '@tanstack/react-router'

interface UserStatusbarProps {
  accumulatedPoint: number
  availablePoint: number
}

const UserStatusbar = ({ accumulatedPoint, availablePoint }: UserStatusbarProps) => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate({ to: '/my-page/my-points' })
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full items-center justify-between px-4 pt-4">
        <div className="flex flex-col items-baseline">
          <p className="mb-1 text-xs text-gray-500">나의 포인트</p>
          <p className="text-2xl font-semibold text-black">{availablePoint}</p>
        </div>
        <button
          className="text-md rounded-2xl bg-[#E8F5E9] px-4 py-1.5 text-green-700 md:text-base"
          onClick={handleButtonClick}
        >
          포인트 내역
        </button>
      </div>
      <div className="self-start px-4 py-2 text-start">
        <p className="md:text-md text-xs text-black">사용 가능 포인트: {accumulatedPoint}p</p>
      </div>
    </div>
  )
}

export default UserStatusbar
