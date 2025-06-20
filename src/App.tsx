import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/app/Login'
import Main from './pages/app/Main'
import MyPage from './pages/app/MyPage'
import { Fragment, useEffect, useState } from 'react'
import SplashScreen from './components/SplashScreen'
import { cn } from './lib/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
        <div className="bg-mountain_meadow-0 outline-mountain_meadow relative aspect-[375/812] h-full justify-self-center outline outline-1">
          <div
            className={`flex h-full flex-1 opacity-100 transition-all duration-500 ${cn(showSplashScreen ? 'overflow-hidden' : null)}`}
          >
            {showSplashScreen ? (
              <SplashScreen />
            ) : (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="*" element={<Main />} />
              </Routes>
            )}
          </div>
        </div>
      </QueryClientProvider>
    </Fragment>
  )
}

export default App
