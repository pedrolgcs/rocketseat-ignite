import { and, count, eq, getTableColumns, ilike } from 'drizzle-orm'

import { Pagination } from '@/domain/store/application/@types/pagination'
import { OrdersRepository } from '@/domain/store/application/repositories'
import type {
  FetchByRestaurantIdParams,
  OrderWithRelations,
} from '@/domain/store/application/repositories/orders-repository'
import { Order } from '@/domain/store/enterprise/entities'

import { db } from '../connection'
import {
  DrizzleOrderItemMapper,
  DrizzleOrderMapper,
  DrizzleUserMapper,
} from '../mappers'
import { orders, users } from '../schema'

export class DrizzleOrdersRepository implements OrdersRepository {
  async fetchByRestaurantId(
    params: FetchByRestaurantIdParams,
  ): Promise<Pagination<Order>> {
    const { restaurantId, perPage, pageIndex, customerName, orderId, status } =
      params

    const orderTableColumns = getTableColumns(orders)

    const baseQuery = db
      .select(orderTableColumns)
      .from(orders)
      .innerJoin(users, eq(users.id, orders.customerId))
      .where(
        and(
          eq(orders.restaurantId, restaurantId),
          orderId ? ilike(orders.id, `%${orderId}%`) : undefined,
          status ? eq(orders.status, status) : undefined,
          customerName ? ilike(users.name, `%${customerName}%`) : undefined,
        ),
      )

    const [amountOfOrdersQuery, filteredOrdersQuery] = await Promise.all([
      db.select({ count: count() }).from(baseQuery.as('baseQuery')),
      db
        .select()
        .from(baseQuery.as('baseQuery'))
        .offset(pageIndex * perPage)
        .limit(perPage),
    ])

    const amountOfOrders = amountOfOrdersQuery[0].count
    const filteredOrders = filteredOrdersQuery.map((order) =>
      DrizzleOrderMapper.toDomain(order),
    )

    return {
      items: filteredOrders,
      meta: {
        pageIndex,
        perPage,
        totalCount: amountOfOrders,
      },
    }
  }

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
