import { Order } from '@/domain/store/enterprise/entities'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      status: order.status,
      totalInCents: order.totalInCents,
      createdAt: order.createdAt,
    }
  }
}
