import { useUserStatus } from '@/hooks/useUserStatus'
import { useUserStore } from '@/store/userStore'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoIcon from '../common/LogoIcon'
import { usersApi } from '@/api/users'

const UserCard = () => {
  const user = useUserStore((s) => s.user)
  const logout = useUserStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleLogoutClick = () => {
    usersApi.logout().finally(() => {
      logout()
    })
  }

  const { data: userStatus } = useUserStatus()

  return (
    <div className="flex flex-col items-center rounded-2xl bg-white shadow-lg">
      <div className="flex w-full flex-row gap-8 p-6">
        <LogoIcon size="large" />
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
                <button className="ml-4 bg-transparent" onClick={handleLogoutClick}>
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
