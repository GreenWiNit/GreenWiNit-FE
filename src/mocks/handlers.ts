// https://mswjs.io/docs/quick-start#2-request-handlers
import { UserStatus } from '@/api/users'
import { apiServerMockingStore } from '@/store/apiServerMockingStore'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const body = await request.json()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /** @ts-ignore: body is not typed */
    const oAuthToken = body?.['oAuthToken']
    console.log('oAuthToken', oAuthToken)

    if (oAuthToken == 'ok-this-is-valid-oAuth-token') {
      return new HttpResponse('ok', {
        status: 200,
        statusText: 'OK',
        headers: {
          'set-cookie': 'authToken=abc-123',
        },
      })
    }

    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
      headers: {
        'set-cookie': 'authToken=;',
      },
    })
  }),

  http.get('/api/v1/users/me/status', ({ cookies }) => {
    const authToken = cookies['authToken']

    if (authToken == null || authToken == '') {
      return new HttpResponse(null, {
        status: 401,
        statusText: 'Unauthorized: not valid authToken',
      })
    }

    const foundUser = apiServerMockingStore.getState().users[0]

    return HttpResponse.json({
      point: foundUser.point,
      challengeCount: foundUser.challengeCount,
      level: {
        name: foundUser.level.name,
        code: foundUser.level.code,
        exp: foundUser.level.exp,
        nextLevelExp: foundUser.level.nextLevelExp,
      },
    } satisfies UserStatus)
  }),
]
