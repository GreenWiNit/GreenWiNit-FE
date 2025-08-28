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
      changeFrequency: 'weekly',
    },
    '/404': {
      priority: 0.1,
      changeFrequency: 'never',
    },
    '/posts/$id': async (_route) => {
      const postsResponse = await postsApi.getPosts()
      const posts = postsResponse.result.content

      return posts.map((post) => ({
        path: `/posts/${post.id}`,
        priority: 0.8,
        changeFrequency: 'daily',
      }))
    },
  },
}
