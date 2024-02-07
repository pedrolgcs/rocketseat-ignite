import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', async () => {
  return HttpResponse.json({
    id: 'mock-id',
    name: 'Pizza Shop',
    description: 'Descrição da loja',
    managerId: 'manager-id',
    createdAt: new Date(),
    updatedAt: null,
  })
})
