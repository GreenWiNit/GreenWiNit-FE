import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import fetchIntercept, { FetchInterceptorResponse } from 'fetch-intercept'
import { API_URL } from './constant/network.ts'
import { userStore } from './store/user-store.ts'
import { initHistoryAndLocation } from './lib/utils.ts'

async function enableMocking() {
  if (import.meta.env.MODE === 'production') {
    return
  }

  const { worker } = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  createRoot(document.getElementById('root')!).render(<App />)
})

fetchIntercept.register({
  request: function (url: string, config: RequestInit) {
    if (url.startsWith(API_URL)) {
      const nextConfig = {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${userStore.getState().accessToken}`,
        },
      }

      return [
        url,
        {
          ...nextConfig,
        },
      ]
    }

    // Modify the url or config here
    return [url, config]
  },

  response: function (response: FetchInterceptorResponse) {
    const isApiUrl = API_URL.startsWith('/')
      ? new URL(response.url).pathname.startsWith(API_URL)
      : response.url.startsWith(API_URL)
    if (isApiUrl && !response.ok) {
      if (response.status >= 400 && response.status < 500) {
        if (response.headers.get('content-type')?.includes('json')) {
          response.json().then((body) => {
            if (body.message === '접근이 거부되었습니다.' || body.message.includes('JWT 토큰')) {
              userStore.getState().setAccessToken(null)
              initHistoryAndLocation()
            }
          })
        }
      }
    }

    return response
  },
})
