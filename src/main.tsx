import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Admin from './pages/Admin.tsx'
import './index.css'

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
  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>,
  )
})
