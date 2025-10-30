// https://github.com/Ryanjso/tanstack-router-sitemap?tab=readme-ov-file#usage
import { Sitemap } from 'tanstack-router-sitemap'
import { type FileRouteTypes } from '../src/routeTree.gen'
import { postsApi } from '../src/api/posts'

// This will become a string literal union of all your routes
export type TRoutes = FileRouteTypes['fullPaths']

const SITEMAP_BASE_URL = process.env['SITEMAP_BASE_URL'] || 'https://www.greenwinit.com'

// Define your sitemap
export const sitemap: Sitemap<TRoutes> = {
  siteUrl: SITEMAP_BASE_URL,
  defaultPriority: 0.5,
  routes: {
    '/': {
      priority: 1,
      changeFrequency: 'daily',
    },
    '/404': {
      priority: 0.1,
      changeFrequency: 'never',
    },
    '/500': {
      priority: 0.1,
      changeFrequency: 'never',
    },
    '/posts/$id': async (_route) => {
      try {
        // 실제 게시글 목록 불러오기 (빌드 실패 시 안전하게 fallback)
        const postsResponse = await postsApi.getPosts()
        const posts = postsResponse.result.content

        return posts.map((post) => ({
          path: `/posts/${post.id}`,
          priority: 0.8,
          changeFrequency: 'daily',
        }))
      } catch {
        console.warn('⚠️ 게시글 불러오기 실패 — 더미 데이터로 sitemap 생성')
        return [{ path: '/posts/example', priority: 0.5, changeFrequency: 'monthly' }]
      }
    },
    '/login': {
      priority: 0.1,
      changeFrequency: 'monthly',
    },
    '/my-page': {
      priority: 0.1,
      changeFrequency: 'monthly',
    },
    '/point-shop': {
      priority: 0.1,
      changeFrequency: 'monthly',
    },
    '/terms': {
      priority: 0.1,
      changeFrequency: 'monthly',
    },
    '/signup': {
      priority: 0.1,
      changeFrequency: 'monthly',
    },
  },
}
