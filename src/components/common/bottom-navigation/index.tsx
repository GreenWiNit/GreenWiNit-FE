import { MouseEventHandler, useState, useCallback, MouseEvent } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import PostIcon from './post.svg?react'
import HomeIcon from './home.svg?react'
import MyPageIcon from './my-page.svg?react'
import ChallengeIcon from './challenge.svg?react'
import { ChartColumnBig } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BottomNavigationProps {
  containerClassName?: string
}
function BottomNavigation({ containerClassName }: BottomNavigationProps) {
  const navigate = useNavigate()
  // 이스터에그: 마이페이지 버튼 빠른 클릭 카운트용
  const [myPageClickCount, setMyPageClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const location = useLocation()

  const handleMyPageClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    if (import.meta.env.MODE === 'production') {
      return
    }

    const now = Date.now()
    // 1초 이내 연속 클릭
    if (now - lastClickTime < 1000) {
      const newCount = myPageClickCount + 1
      setMyPageClickCount(newCount)
      setLastClickTime(now)
      if (newCount >= 3) {
        localStorage.clear()
        window.location.href = '/'
      }
    } else {
      // 1초 이상이면 카운트 리셋
      setMyPageClickCount(1)
      setLastClickTime(now)
    }
  }, [myPageClickCount, lastClickTime])

  const handleItemClick = (moveTo: string) => (e: MouseEvent<HTMLButtonElement>) => {
    navigate({ to: moveTo })

    if (moveTo === '/my-page') {
      handleMyPageClick(e)
    }
  }

  return (
    <nav
      className={cn('flex w-full border-t border-gray-200 bg-white shadow-lg', containerClassName)}
    >
      <div className="flex h-16 flex-1 items-center justify-around px-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.moveTo === '/'
              ? location.pathname === item.moveTo
              : location.pathname.startsWith(item.moveTo)

          return (
            <button
              key={item.moveTo}
              onClick={handleItemClick(item.moveTo)}
              className={`group relative flex h-full flex-1 flex-col items-center justify-center transition-all duration-50 ease-in ${
                isActive ? 'text-black' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {/* 클릭 시 퍼지는 애니메이션 효과 */}
              <div className="absolute inset-0 rounded-lg transition-all duration-50 ease-in-out group-active:bg-gray-100" />
              <div className="relative mb-1 h-6 w-6 transition-all duration-50 group-hover:opacity-80">
                {item.icon({ isActive })}
              </div>
              <span className="relative text-sm leading-tight font-medium transition-all duration-50 group-hover:opacity-80">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

interface NavItem {
  icon: (props: { isActive: boolean }) => React.ReactNode
  label: string
  moveTo: string
}

const NAV_ITEMS = [
  {
    icon: ({ isActive, ...rest }: { isActive: boolean }) => (
      <HomeIcon {...rest} className={cn(isActive ? 'text-mountain_meadow' : 'text-[#737373]')} />
    ),
    label: '홈',
    moveTo: '/',
  } satisfies NavItem,
  {
    icon: ({ isActive, ...rest }: { isActive: boolean }) => (
      <ChallengeIcon
        {...rest}
        className={cn(isActive ? 'text-mountain_meadow' : 'text-[#737373]')}
      />
    ),
    label: '챌린지',
    moveTo: '/challenges',
  },
  {
    icon: ({ isActive, ...rest }: { isActive: boolean }) => (
      <PostIcon {...rest} className={cn(isActive ? 'text-mountain_meadow' : 'text-[#737373]')} />
    ),
    label: '정보공유',
    moveTo: '/posts',
  },
  {
    icon: (props: { isActive: boolean }) => (
      <ChartColumnBig
        {...props}
        className={cn(props.isActive ? 'text-mountain_meadow' : 'text-[#737373]')}
      />
    ),
    label: '대시보드',
    moveTo: '/dash-board',
  } satisfies NavItem,
  {
    icon: ({ isActive, ...rest }: { isActive: boolean }) => (
      <MyPageIcon {...rest} className={cn(isActive ? 'text-mountain_meadow' : 'text-[#737373]')} />
    ),
    label: '마이페이지',
    moveTo: '/my-page',
  } satisfies NavItem,
] as const

export default BottomNavigation
