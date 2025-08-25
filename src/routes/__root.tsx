import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '../index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/shadcn/sonner'
import NotFound from '@/components/common/not-found'
import InternalServerError from '@/components/common/internal-server-error'
import { useEffect, useState } from 'react'
import SplashScreen from '@/components/splash-screen'
import { cn } from '@/lib/utils'
import { queryClient } from '@/constant/globals'

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <RootElement />
      <Toaster position="top-center" swipeDirections={['bottom', 'left', 'right', 'top']} />
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  ),
  notFoundComponent: () => {
    return <NotFound />
  },
  errorComponent: InternalServerError,
})

const RootElement = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false)
    }, 1500)
  }, [])

  return (
    <div className="relative flex h-full w-[var(--app-width)] justify-self-center bg-white">
      {showSplashScreen ? (
        <div
          className={`flex h-full flex-1 opacity-100 transition-all duration-500 ${cn(showSplashScreen ? 'overflow-hidden' : null)}`}
        >
          <SplashScreen />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  )
}
