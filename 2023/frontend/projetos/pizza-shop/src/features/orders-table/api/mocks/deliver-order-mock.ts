import { http, HttpResponse } from 'msw'

import { DeliverOrderParams } from '../deliver-order'
import { inMemoryOrders } from './in-memory/in-memory-orders'

export const deliverOrderMock = http.patch<DeliverOrderParams>(
  '/orders/:orderId/deliver',
  async ({ params }) => {
    const orderIndex = inMemoryOrders.findIndex(
      (order) => order.orderId === params.orderId,
    )

    if (orderIndex < 0) {
      return new HttpResponse(null, { status: 400 })
    }

    inMemoryOrders[orderIndex].status = 'delivered'

    return new HttpResponse(null, { status: 204 })
  },
)
