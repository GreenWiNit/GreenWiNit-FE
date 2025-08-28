import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
// https://ko.vite.dev/config/#using-environment-variables-in-config
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { generateSitemap } from 'tanstack-router-sitemap'
import { sitemap } from './scripts/sitemap.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      svgr(),
      tailwindcss(),
      generateSitemap(sitemap),
      cloudflare(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      allowedHosts: [],
      proxy: {
        [env.VITE_API_URL]: {
          target: env.API_PROXY_TO,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_URL}`), ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // pass origin header to target server to avoid CORS error
              // 로컬에서 백엔드까지 구동하는 경우 대소문자 구분하는 경우가 있어서 Origin, Referer로 설정
              proxyReq.setHeader('Origin', 'http://localhost:5173')
              proxyReq.setHeader('Referer', 'http://localhost:5173')
            })
          },
        },
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react-datepicker')) return 'vendor-react-datepicker'
              if (id.includes('date-fns')) return 'vendor-date-fns'
              if (id.includes('@tanstack/react-query')) return 'vendor-tanstack-react-query'
              if (id.includes('sonner')) return 'vendor-sonner'
              if (id.includes('react-hook-form') || id.includes('@hookform')) {
                return 'vendor-react-hook-form'
              }
              if (id.includes('embla-carousel')) return 'vendor-embla-carousel'
              if (id.includes('dayjs')) return 'vendor-dayjs'
              if (id.includes('next-themes')) return 'vendor-next-themes'
              if (id.includes('@radix-ui')) {
                return 'vendor-radix-ui'
              }
              if (id.includes('@tanstack/react-query')) {
                return 'vendor-tanstack'
              }
              if (
                id.includes('react') ||
                id.includes('react-dom') ||
                id.includes('scheduler') ||
                id.includes('use-callback-ref')
              ) {
                return 'vendor-react'
              }
            }
          },
        },
      },
    },
  }
})
