import { http, HttpResponse } from 'msw'

import { ApproveOrderParams } from '../approve-order'
import { inMemoryOrders } from './in-memory/in-memory-orders'

export const approveOrderMock = http.patch<ApproveOrderParams>(
  '/orders/:orderId/approve',
  async ({ params }) => {
    const orderIndex = inMemoryOrders.findIndex(
      (order) => order.orderId === params.orderId,
    )

    if (orderIndex < 0) {
      return new HttpResponse(null, { status: 404 })
    }

    inMemoryOrders[orderIndex].status = 'processing'

    return new HttpResponse(null, { status: 204 })
  },
)
