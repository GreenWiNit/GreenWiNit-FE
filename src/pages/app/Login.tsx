import { usersApi } from '@/api/users'
import HeaderSectionMiddle from '@/components/common/HeaderSectionMiddle'
import GoogleWideButton from '@/components/login-screen/GoogleWideButton'
import KakaoWideButton from '@/components/login-screen/KakaoWideButton'
import NaverWideButton from '@/components/login-screen/NaverWideButton'
import { useUserStore } from '@/store/userStore'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const login = useUserStore((state) => state.login)
  const logout = useUserStore((state) => state.logout)

  const processLogin = (oAuthToken: string) => {
    usersApi
      .login({ oAuthToken })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Login failed')
        }

        return login()
      })
      .catch((err) => {
        console.error('Login failed', err)
        logout()
        throw err
      })
      .then(() => {
        return navigate('/')
      })
  }

  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-start gap-12">
      <HeaderSectionMiddle />
      <div className="absolute bottom-[10vh] flex w-full flex-col items-center justify-center gap-4 p-12">
        <KakaoWideButton onClick={() => processLogin('ok-this-is-valid-oAuth-token')} />
        <GoogleWideButton onClick={() => processLogin('not-ok-this-is-invalid-oAuth-token')} />
        <NaverWideButton onClick={() => processLogin('ok-this-is-valid-oAuth-token')} />
        <p className="text-light-gray mt-4 text-center text-sm">
          간편하게 로그인하고
          <br />
          환경 챌린지에 참여하세요!
        </p>
      </div>
    </div>
  )
}

export default Login
