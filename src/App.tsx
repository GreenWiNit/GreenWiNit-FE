import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/app/Login'
import Main from './pages/app/Main'
import MyPage from './pages/app/MyPage'
import { Fragment, useEffect, useState } from 'react'
import SplashScreen from './components/SplashScreen'
import { cn } from './lib/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import JoinedChallenges from './pages/app/challenges/user/me/joined'
import ChallengeDetail from './pages/app/challenges/detail/[id]'
import ChallengeSubmit from './pages/app/challenges/submit/[id]'

const queryClient = new QueryClient()

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false)
    }, 1500)
  }, [])

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider theme={muiTheme}>
          <div className="bg-mountain_meadow-0 outline-mountain_meadow relative aspect-[375/812] h-full justify-self-center outline outline-1">
            <div
              className={`flex h-full flex-1 opacity-100 transition-all duration-500 ${cn(showSplashScreen ? 'overflow-hidden' : null)}`}
            >
              {showSplashScreen ? (
                <SplashScreen />
              ) : (
                <Routes>
                  <Route path="/challenges/user/me/joined" element={<JoinedChallenges />} />
                  <Route path="/challenges/detail/:id" element={<ChallengeDetail />} />
                  <Route path="/challenges/submit/:id" element={<ChallengeSubmit />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/my" element={<MyPage />} />
                  <Route path="*" element={<Main />} />
                </Routes>
              )}
            </div>
          </div>
        </MuiThemeProvider>
      </QueryClientProvider>
    </Fragment>
  )
}

const muiTheme = createTheme({
  typography: {
    fontFamily: [
      'Pretendard',
      'Roboto',
      'Inter',
      'system-ui',
      'Avenir',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
})

export default App
