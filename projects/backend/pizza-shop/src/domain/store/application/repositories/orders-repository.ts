import {
  Order,
  OrderItem,
  OrderStatus,
  User,
} from '@/domain/store/enterprise/entities'

import { Pagination } from '../@types/pagination'

export type OrderWithRelations = {
  order: Order
  customer: User | null
  orderItems: OrderItem[]
}

export type FetchByRestaurantIdParams = {
  restaurantId: string
  perPage: number
  customerName?: string
  orderId?: string
  status?: OrderStatus
  pageIndex: number
}

export abstract class OrdersRepository {
  abstract fetchByRestaurantId(
    params: FetchByRestaurantIdParams,
  ): Promise<Pagination<Order>>

  abstract findById(id: string): Promise<Order | null>
  abstract findByIdWithRelations(id: string): Promise<OrderWithRelations | null>
  abstract update(order: Order): Promise<void>
}
