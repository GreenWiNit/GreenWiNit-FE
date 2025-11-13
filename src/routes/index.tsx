import AppTitle from '@/components/common/app-title'
import BottomNavigation from '@/components/common/bottom-navigation'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import Challenges from '@/components/home-screen/challenges'
import { authStore } from '@/store/auth-store'
import PageLayOut from '@/components/common/page-layout'
import { ChevronRight } from 'lucide-react'
import SuggestChallenge from '@/components/home-screen/challenges/suggest_challenge'

type HomeSearch =
  | undefined
  | {
      accessToken?: string | undefined
      refreshToken?: string | undefined
    }

export const Route = createFileRoute('/')({
  component: Home,
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    const refreshToken =
      typeof search['refreshToken'] === 'string' ? search['refreshToken'] : undefined

    const accessToken =
      typeof search['accessToken'] === 'string' ? search['accessToken'] : undefined

    return { accessToken, refreshToken }
  },
})

function Home() {
  const navigate = useNavigate()
  const search = Route.useSearch()
  const setAccessToken = authStore((state) => state.setAccessToken)

  useEffect(() => {
    const accessToken = search?.accessToken
    const refreshToken = search?.refreshToken

    if (accessToken) {
      setAccessToken(accessToken)
      navigate({ to: '/' })
    }
    if (refreshToken) {
      document.cookie = `TokenManager=${refreshToken}; path=/;`
    }
  }, [setAccessToken, navigate, search?.accessToken, search?.refreshToken])

  if (window.location.hostname.endsWith('.store')) {
    const urlParams = new URLSearchParams(window.location.search)
    if (!urlParams.has('skip_navigate')) {
      navigate({ to: '/navigate' })
    }
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <AppTitle className="!text-3xl" />
        </PageLayOut.HeaderSection>
        <PageLayOut.BodySection padding="zero">
          <div className="flex flex-col justify-baseline gap-2 p-4">
            <SuggestChallenge />
            <div className="flex flex-row justify-between">
              <h3 className="text-lg font-bold">나의 포인트 순위는?</h3>
              <a href="/ranking" className="flex flex-row items-center">
                <span className="text-ring text-sm">전체보기</span>
                <ChevronRight size={12} className="text-ring" />
              </a>
            </div>
            <span className="text-ring text-start text-xs">
              주간 누적 포인트와 인증수를 합산해 순위가 정해져요.
            </span>
          </div>
          <Challenges />
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default Home
