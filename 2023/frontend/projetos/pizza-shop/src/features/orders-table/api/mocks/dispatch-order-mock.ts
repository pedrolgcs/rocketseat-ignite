import { http, HttpResponse } from 'msw'

import { DispatchOrderParams } from '../dispatch-order'
import { inMemoryOrders } from './in-memory/in-memory-orders'

export const dispatchOrderMock = http.patch<DispatchOrderParams>(
  '/orders/:orderId/dispatch',
  async ({ params }) => {
    const orderIndex = inMemoryOrders.findIndex(
      (order) => order.orderId === params.orderId,
    )

    if (orderIndex < 0) {
      return new HttpResponse(null, { status: 400 })
    }

    inMemoryOrders[orderIndex].status = 'delivering'

    return new HttpResponse(null, { status: 204 })
  },
)
