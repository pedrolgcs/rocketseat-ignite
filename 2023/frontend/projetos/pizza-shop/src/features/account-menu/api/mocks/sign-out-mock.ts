import { http, HttpResponse } from 'msw'

export const signOutMock = http.post('/sign-out', async () => {
  return new HttpResponse(null, {
    status: 200,
  })
})
