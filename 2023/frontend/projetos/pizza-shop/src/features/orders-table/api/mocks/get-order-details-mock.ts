import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', async ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
    },
    orderItems: [
      {
        id: 'order-item-1',
        product: {
          name: 'Product 1',
        },
        priceInCents: 1000,
        quantity: 3,
      },
      {
        id: 'order-item-2',
        product: {
          name: 'Product 2',
        },
        priceInCents: 2000,
        quantity: 1,
      },
    ],
    totalInCents: 5000,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: null,
  })
})
