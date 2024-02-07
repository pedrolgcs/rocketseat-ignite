import { http, HttpResponse } from 'msw'

import { UpdateProfileParams } from '../update-profile'

export const updateProfile = http.put<never, UpdateProfileParams>(
  '/profile',
  async ({ request }) => {
    const { name } = await request.json()

    if (name.match(/^[a-zA-Z ]+$/)) {
      return new HttpResponse(null, { status: 204 })
    }

    return new HttpResponse(null, { status: 400 })
  },
)
