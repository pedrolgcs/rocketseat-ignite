import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  gte,
  ilike,
  sql,
  sum,
} from 'drizzle-orm'

import { Pagination } from '@/domain/store/application/@types/pagination'
import { OrdersRepository } from '@/domain/store/application/repositories'
import type {
  FetchByRestaurantIdParams,
  GetMonthCanceledOrdersParams,
  GetMonthCanceledOrdersResponse,
  GetMonthsRevenueParams,
  GetMonthsRevenueResponse,
  GetOrdersPerDayParams,
  GetOrdersPerDayResponse,
  GetOrdersPerMonthParams,
  GetOrdersPerMonthResponse,
  OrderWithCustomer,
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
  ): Promise<Pagination<OrderWithCustomer>> {
    const { restaurantId, perPage, pageIndex, customerName, orderId, status } =
      params

    const orderTableColumns = getTableColumns(orders)
    const customerTableColumns = getTableColumns(users)

    const baseQuery = db
      .select({
        ...orderTableColumns,
        customer: {
          ...customerTableColumns,
          id: sql<string>`${users.id}`.as('user_id'),
          createdAt: sql<string>`${users.createdAt}`.as('user_createdAt'),
        },
      })
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
        .limit(perPage)
        .orderBy((fields) => {
          return [
            sql`CASE ${fields.status} 
              WHEN 'pending' THEN 1 
              WHEN 'processing' THEN 2 
              WHEN 'delivering' THEN 3 
              WHEN 'delivered' THEN 4 
              WHEN 'canceled' THEN 99 
              END`,
            desc(fields.createdAt),
          ]
        }),
    ])

    const amountOfOrders = amountOfOrdersQuery[0].count

    const items = filteredOrdersQuery.map((order) => {
      const orderToDomain = DrizzleOrderMapper.toDomain(order)
      const userToDomain = DrizzleUserMapper.toDomain({
        ...order.customer,
        createdAt: new Date(order.customer.createdAt),
      })

      return {
        order: orderToDomain,
        customer: userToDomain,
      }
    })

    return {
      items,
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

  async getMonthsRevenue(
    params: GetMonthsRevenueParams,
  ): Promise<GetMonthsRevenueResponse> {
    const { restaurantId, dateStart } = params

    const raw = await db
      .select({
        monthWithYear: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        revenue: sum(orders.totalInCents).mapWith(Number),
      })
      .from(orders)
      .where(
        and(
          eq(orders.restaurantId, restaurantId),
          gte(orders.createdAt, dateStart),
        ),
      )
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)

    return raw
  }

  async getOrdersPerDay(
    params: GetOrdersPerDayParams,
  ): Promise<GetOrdersPerDayResponse> {
    const { restaurantId, startFrom } = params

    const raw = await db
      .select({
        dayWithMonthAndYear: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM-DD')`,
        amount: count(),
      })
      .from(orders)
      .where(
        and(
          eq(orders.restaurantId, restaurantId),
          gte(orders.createdAt, startFrom),
        ),
      )
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM-DD')`)

    return raw
  }

  async getCanceledOrdersPerMonth(
    params: GetMonthCanceledOrdersParams,
  ): Promise<GetMonthCanceledOrdersResponse> {
    const { startFrom, restaurantId } = params

    const raw = await db
      .select({
        monthWithYear: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        amount: count(),
      })
      .from(orders)
      .where(
        and(
          eq(orders.restaurantId, restaurantId),
          eq(orders.status, 'canceled'),
          gte(orders.createdAt, startFrom),
        ),
      )
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)

    return raw
  }

  async getOrdersPerMonth(
    params: GetOrdersPerMonthParams,
  ): Promise<GetOrdersPerMonthResponse> {
    const { startFrom, restaurantId } = params

    const raw = await db
      .select({
        monthWithYear: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        amount: count(),
      })
      .from(orders)
      .where(
        and(
          eq(orders.restaurantId, restaurantId),
          gte(orders.createdAt, startFrom),
        ),
      )
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)

    return raw
  }

  async update(order: Order): Promise<void> {
    const raw = DrizzleOrderMapper.toDrizzle(order)
    await db.update(orders).set(raw).where(eq(orders.id, raw.id))
  }
}
