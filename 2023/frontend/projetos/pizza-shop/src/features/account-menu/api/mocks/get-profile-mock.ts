import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: 'mock-id',
      name: 'John Doe',
      email: 'jondoe@example.com',
      phone: '(11) 99999-9999',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
