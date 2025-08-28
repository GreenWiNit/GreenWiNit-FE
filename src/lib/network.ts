export async function throwResponseStatusThenChaining(response: Response) {
  const body = await response.clone().json()
  if (response.ok) {
    if (body && typeof body === 'object' && 'success' in body) {
      // success가 있는데 falsy하면 throw하기 위해 아래쪽으로 흐름을 가짐
      if (body.success) {
        return response
      }
      // success가 없는 경우 그대로 반환
    } else {
      return response
    }
  }

  return response
    .clone()
    .json()
    .then((body) => {
      if (
        body &&
        typeof body === 'object' &&
        'message' in body &&
        typeof body.message === 'string'
      ) {
        throw new Error(body.message)
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    })
}
