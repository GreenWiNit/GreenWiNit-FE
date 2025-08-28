// /scripts에서 진입한 경우 import.meta.env가 falsy함
export const API_SERVER_BASE_PATH = import.meta.env?.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : (import.meta.env?.VITE_API_SERVER_BASE_URL ?? 'https://api.greenwinit.store')

export const API_URL = `${API_SERVER_BASE_PATH}/api`
