export type BaseApiResponse<T> = {
  success: boolean
  message: string
  result?: T
}
