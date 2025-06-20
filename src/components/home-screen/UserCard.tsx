import { useUserStatus } from '@/hooks/useUserStatus'
import { useUserStore } from '@/store/userStore'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const UserCard = () => {
  const user = useUserStore((s) => s.user)
  const logout = useUserStore((s) => s.logout)
  const navigate = useNavigate()

  console.log('user', user)

  const handleLoginClick = () => {
    navigate('/login')
  }

  const { data: userStatus } = useUserStatus()

  console.log('userStatus', userStatus)

  return (
    <div className="flex flex-col items-center rounded-2xl bg-white shadow-lg">
      <div className="flex w-full flex-row gap-8 p-6">
        <div className="h-[92px] w-[92px] rounded-full border-2 border-gray-300 bg-[url('/img/logo-icon.png')] bg-cover bg-size-[50px] bg-no-repeat [background-position-x:22px] [background-position-y:center]" />
        <div className="flex flex-1 flex-col items-start justify-center gap-2">
          {user == null ? (
            <Fragment>
              <p className="text-2xl font-bold">로그인이 필요합니다.</p>
              <button className="bg-transparent" onClick={handleLoginClick}>
                로그인
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="w-[80%] text-start text-base leading-[2]">
                <span className="text-xl font-bold">{user.name}님</span>
                <button className="ml-4 bg-transparent" onClick={logout}>
                  로그아웃
                </button>
                <br />
                <span className="leading-[1.5] break-keep">
                  환경 챌린지에 참여하고 포인트를 모아보세요
                </span>
              </p>
            </Fragment>
          )}
        </div>
      </div>
      <div className="flex h-[1px] w-full bg-gray-200" />
      <div className="flex w-full flex-row items-center justify-center gap-20 p-4">
        <div className="flex flex-col items-center">
          <span className="text-mountain_meadow font-bold">
            {userStatus == null ? '?' : `${userStatus?.point}p`}
          </span>
          <span>포인트 현황</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-mountain_meadow font-bold">
            {userStatus == null ? '?' : `${userStatus?.challengeCount}회`}
          </span>
          <span>참여 챌린지</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-mountain_meadow font-bold">
            {userStatus == null ? '?' : `Lv.${userStatus?.level.code}`}
          </span>
          <span>나의 레벨</span>
        </div>
      </div>
    </div>
  )
}

export default UserCard
