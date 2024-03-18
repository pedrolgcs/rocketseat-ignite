import { Order, OrderItem, User } from '@/domain/store/enterprise/entities'

export type OrderWithRelations = {
  order: Order
  customer: User | null
  orderItems: OrderItem[]
}

export abstract class OrdersRepository {
  abstract findById(id: string): Promise<Order | null>
  abstract findByIdWithRelations(id: string): Promise<OrderWithRelations | null>
  abstract update(order: Order): Promise<void>
}
