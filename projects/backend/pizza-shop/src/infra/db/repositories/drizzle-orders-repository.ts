import { eq } from 'drizzle-orm'

import { OrdersRepository } from '@/domain/store/application/repositories'
import type { OrderWithRelations } from '@/domain/store/application/repositories/orders-repository'
import { Order } from '@/domain/store/enterprise/entities'

import { db } from '../connection'
import {
  DrizzleOrderItemMapper,
  DrizzleOrderMapper,
  DrizzleUserMapper,
} from '../mappers'
import { orders } from '../schema'

export class DrizzleOrdersRepository implements OrdersRepository {
  async findById(id: string): Promise<Order | null> {
    const raw = await db.query.orders.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id)
      },
    })

    if (!raw) return null

    return DrizzleOrderMapper.toDomain(raw)
  }

  async findByIdWithRelations(id: string): Promise<OrderWithRelations | null> {
    const raw = await db.query.orders.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id)
      },
      with: {
        customer: true,
        orderItems: {
          with: {
            product: true,
          },
        },
      },
    })

    if (!raw) return null

    const order = DrizzleOrderMapper.toDomain(raw)

    const customer = raw.customer
      ? DrizzleUserMapper.toDomain(raw.customer)
      : null

    const orderItems = raw.orderItems.map((orderItem) =>
      DrizzleOrderItemMapper.toDomain(orderItem),
    )

    return {
      order,
      customer,
      orderItems,
    }
  }

  async update(order: Order): Promise<void> {
    const raw = DrizzleOrderMapper.toDrizzle(order)
    await db.update(orders).set(raw).where(eq(orders.id, raw.id))
  }
}
