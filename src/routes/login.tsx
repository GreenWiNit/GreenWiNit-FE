import HeaderSectionMiddle from '@/components/common/header-section-middle'
import GoogleWideButton from '@/components/login-screen/google-wide-button'
import KakaoWideButton from '@/components/login-screen/kakao-wide-button'
import NaverWideButton from '@/components/login-screen/naver-wide-button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'

type LoginSearch =
  | undefined
  | {
      message?: string | undefined
      errorName?: string | undefined
    }

export const Route = createFileRoute('/login')({
  component: Login,
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    const message = typeof search['message'] === 'string' ? search['message'] : undefined
    const errorName = typeof search['error'] === 'string' ? search['error'] : undefined

    return {
      message,
      errorName,
    }
  },
})

function Login() {
  const navigate = useNavigate()
  // URL에서 쿼리 파라미터 확인
  const search = Route.useSearch()
  const errorName = search?.errorName
  const message = search?.message

  useEffect(() => {
    if (errorName && message) {
      toast.error(message)
    } else if (message) {
      toast.info(message)
    }
    navigate({ to: '/login', search: { errorName: undefined, message: undefined } })
  }, [errorName, message, navigate])

  const mekeHandlerProcessLoginWithOAuth =
    (provider: 'google' | 'kakao' | 'naver') => (event: React.MouseEvent<HTMLButtonElement>) => {
      // 폼이면 제출을 막기위해
      event.preventDefault()

      // API_URL이나 API_SERVER_BASE_PATH 사용하면 안됨
      // 프록시를 통하면 리다이렉션 후 /login?error=auth_failed로 이동됨 (2025-07-30)
      const moveToBase =
        import.meta.env.VITE_OAUTH_BASE_URL ??
        (import.meta.env.MODE === 'staging'
          ? 'https://staging-api.greenwinit.com'
          : import.meta.env.MODE === 'production'
            ? 'https://api.greenwinit.com'
            : 'https://api.greenwinit.com')
      const moveTo = `${moveToBase}/oauth2/authorization/${provider}`
      window.location.replace(moveTo)
    }

  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-start gap-12">
      <HeaderSectionMiddle />
      <div className="min-short:bottom-4 short:bottom-[8vh] short:pb-0 absolute bottom-[10vh] flex w-full flex-col items-center justify-center gap-4 p-12">
        <KakaoWideButton onClick={mekeHandlerProcessLoginWithOAuth('kakao')} />
        <GoogleWideButton onClick={mekeHandlerProcessLoginWithOAuth('google')} />
        <NaverWideButton onClick={mekeHandlerProcessLoginWithOAuth('naver')} />
        <p className="text-light-gray short:mt-0 mt-4 text-center text-sm">
          간편하게 로그인하고
          <br />
          환경 챌린지에 참여하세요!
        </p>
      </div>
    </div>
  )
}

export default Login
