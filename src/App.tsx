import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'
import { cn } from './lib/utils'
import SplashScreen from './components/SplashScreen'
import JoinedChallenges from './pages/challenges/user/me/joined'
import ChallengeDetail from './pages/challenges/[id]/detail'
import ChallengeSubmitIndividual from './pages/challenges/[id]/submit/individual'
import ChallengesTeam from './pages/challenges/[id]/teams'
import JoinTeam from './pages/challenges/[id]/teams/join'
import TeamDetail from './pages/challenges/[id]/teams/[id]'
import TeamEnroll from './pages/challenges/[id]/teams/enroll'
import ManageTeam from './pages/challenges/[id]/teams/[id]/joined'
import TeamModify from './pages/challenges/[id]/teams/[id]/modify'
import ChallengeSubmitTeam from './pages/challenges/[id]/submit/team/[teamId]'
import InternalServerError from './pages/500'
import Home from '@/pages/home'
import Login from '@/pages/login'
import MyPage from '@/pages/my-page'
import MyPoints from '@/pages/my-page/my-points'
import WithDraw from '@/pages/my-page/withdraw'
import EditProfile from '@/pages/my-page/edit-profile'
import CertifiedChallenges from '@/pages/my-page/certifed-challenges'
import CertifiedChallengesDetail from '@/pages/my-page/certified-challenges-detail'
import NotFound from '@/pages/404'
import './App.css'
import PointShop from './pages/app/PointShop'
import ProductDetail from './pages/app/products/[id]/detail'
import EnrollAddress from './components/shop-screen/EnrollAddress'
import Signup from './pages/signup'
import InformationShare from './pages/app/InformationShare'
import InformationDetail from './pages/app/informations/[id]/detail'

const queryClient = new QueryClient()

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false)
    }, 1500)
  }, [])

  return (
    <ErrorBoundary fallback={<InternalServerError />}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div className="bg-mountain_meadow-0 outline-mountain_meadow relative aspect-[375/812] h-full justify-self-center outline-1">
            <div
              className={`flex h-full flex-1 opacity-100 transition-all duration-500 ${cn(showSplashScreen ? 'overflow-hidden' : null)}`}
            >
              {showSplashScreen ? (
                <SplashScreen />
              ) : (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/challenges/user/me/joined" element={<JoinedChallenges />} />
                  <Route path="/challenges/:challengeId/detail" element={<ChallengeDetail />} />
                  <Route
                    path="/challenges/:challengeId/submit/individual"
                    element={<ChallengeSubmitIndividual />}
                  />
                  <Route
                    path="/challenges/:challengeId/submit/teams/:teamId"
                    element={<ChallengeSubmitTeam />}
                  />
                  <Route path="/challenges/:challengeId/teams/join" element={<JoinTeam />} />
                  <Route path="/challenges/:challengeId/teams" element={<ChallengesTeam />} />
                  <Route path="/challenges/:challengeId/teams/enroll" element={<TeamEnroll />} />
                  <Route
                    path="/challenges/:challengeId/teams/:teamId/joined"
                    element={<ManageTeam />}
                  />
                  <Route
                    path="/challenges/:challengeId/teams/:teamId/modify"
                    element={<TeamModify />}
                  />
                  <Route path="/challenges/:challengeId/teams/:teamId" element={<TeamDetail />} />
                  <Route path="/my-page" element={<MyPage />} />
                  <Route path="/my-page/my-points" element={<MyPoints />} />
                  <Route path="/my-page/withdraw" element={<WithDraw />} />
                  <Route path="/my-page/edit-profile" element={<EditProfile />} />
                  <Route path="/my-page/challenges/certified" element={<CertifiedChallenges />} />
                  <Route
                    path="/my-page/challenges/certify/:challengeId"
                    element={<CertifiedChallengesDetail />}
                  />
                  <Route path="/information-share" element={<InformationShare />} />
                  <Route path="/information-share/:informationId" element={<InformationDetail />} />
                  <Route path="/point-shop" element={<PointShop />} />
                  <Route path="/point-shop/product/:pointProductId" element={<ProductDetail />} />
                  <Route
                    path="/point-shop/product/:pointProductId/enrollAddress"
                    element={<EnrollAddress />}
                  />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="/500" element={<InternalServerError />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              )}
            </div>
          </div>
          <Toaster position="top-center" swipeDirections={['bottom', 'left', 'right', 'top']} />
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
