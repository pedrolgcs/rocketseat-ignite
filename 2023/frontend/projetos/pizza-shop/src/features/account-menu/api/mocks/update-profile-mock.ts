import { http, HttpResponse } from 'msw'

export const updateProfile = http.put('/profile', async () => {
  return new HttpResponse(null, {
    status: 201,
  })
})
