/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// https://vite.dev/guide/env-and-mode.html#intellisense-for-typescript
interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_API_SERVER_BASE_URL?: string
  readonly VITE_OAUTH_BASE_URL?: string
}
