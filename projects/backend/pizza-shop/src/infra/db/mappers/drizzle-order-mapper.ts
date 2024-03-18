import { InferSelectModel } from 'drizzle-orm'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/store/enterprise/entities'

import { orders } from '../schema'

type DrizzleOrder = InferSelectModel<typeof orders>

export class DrizzleOrderMapper {
  static toDomain(raw: DrizzleOrder): Order {
    return Order.create(
      {
        customerId: raw.customerId ? new UniqueEntityID(raw.customerId) : null,
        restaurantId: new UniqueEntityID(raw.restaurantId),
        status: raw.status,
        totalInCents: raw.totalInCents,
        createdAt: raw.created_at,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(order: Order): DrizzleOrder {
    return {
      id: order.id.toString(),
      customerId: order.customerId ? order.customerId.toString() : null,
      restaurantId: order.restaurantId.toString(),
      status: order.status,
      totalInCents: order.totalInCents,
      created_at: order.createdAt,
    }
  }
}
