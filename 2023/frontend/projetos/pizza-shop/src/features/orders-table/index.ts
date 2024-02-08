import { approveOrderMock } from './api/mocks/approve-order.mock'
import { cancelOrderMock } from './api/mocks/cancel-order-mock'
import { deliverOrderMock } from './api/mocks/deliver-order-mock'
import { dispatchOrderMock } from './api/mocks/dispatch-order-mock'
import { getOrderDetailsMock } from './api/mocks/get-order-details-mock'
import { getOrdersMock } from './api/mocks/get-orders-mock'

export { OrdersTable } from './components/orders-table'

export const ordersTableHttpMocks = [
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
]
