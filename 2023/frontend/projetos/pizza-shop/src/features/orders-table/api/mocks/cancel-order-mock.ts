import { http, HttpResponse } from 'msw'

import { CancelOrderParams } from '../cancel-order'
import { inMemoryOrders } from './in-memory/in-memory-orders'

export const cancelOrderMock = http.patch<CancelOrderParams>(
  '/orders/:orderId/cancel',
  async ({ params }) => {
    const orderIndex = inMemoryOrders.findIndex(
      (order) => order.orderId === params.orderId,
    )

    if (orderIndex < 0) {
      return new HttpResponse(null, { status: 400 })
    }

    inMemoryOrders[orderIndex].status = 'canceled'

    return new HttpResponse(null, { status: 204 })
  },
)
