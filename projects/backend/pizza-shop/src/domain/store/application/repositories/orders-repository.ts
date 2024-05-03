import {
  Order,
  OrderItem,
  OrderStatus,
  Product,
  User,
} from '@/domain/store/enterprise/entities'

import { Pagination } from '../@types/pagination'

export type OrderWithRelations = {
  order: Order
  customer: User | null
  orderItems: OrderItem[]
}

export type OrderWithCustomer = {
  order: Order
  customer: User
}

export type FetchByRestaurantIdParams = {
  restaurantId: string
  perPage: number
  customerName?: string
  orderId?: string
  status?: OrderStatus
  pageIndex: number
}

export type GetMonthsRevenueParams = {
  restaurantId: string
  dateStart: Date
}

export type GetMonthsRevenueResponse = {
  monthWithYear: string
  revenue: number
}[]

export type GetOrdersPerDayParams = {
  restaurantId: string
  startFrom: Date
}

export type GetOrdersPerDayResponse = {
  dayWithMonthAndYear: string
  amount: number
}[]

export type GetOrdersPerMonthParams = {
  restaurantId: string
  startFrom: Date
}

export type GetOrdersPerMonthResponse = {
  monthWithYear: string
  amount: number
}[]

export type GetMonthCanceledOrdersParams = {
  restaurantId: string
  startFrom: Date
}

export type GetMonthCanceledOrdersResponse = {
  monthWithYear: string
  amount: number
}[]

export type GetPopularProductsByRestaurantResponse = {
  product: Product
  amount: number
}[]

export type GetOrdersInPeriodParams = {
  startDate: Date
  endDate: Date
  restaurantId: string
}

export abstract class OrdersRepository {
  abstract fetchByRestaurantId(
    params: FetchByRestaurantIdParams,
  ): Promise<Pagination<OrderWithCustomer>>

  abstract findById(id: string): Promise<Order | null>
  abstract findByIdWithRelations(id: string): Promise<OrderWithRelations | null>
  abstract getMonthsRevenue(
    params: GetMonthsRevenueParams,
  ): Promise<GetMonthsRevenueResponse>

  abstract getOrdersPerDay(
    params: GetOrdersPerDayParams,
  ): Promise<GetOrdersPerDayResponse>

  abstract getOrdersPerMonth(
    params: GetOrdersPerMonthParams,
  ): Promise<GetOrdersPerMonthResponse>

  abstract getCanceledOrdersPerMonth(
    params: GetMonthCanceledOrdersParams,
  ): Promise<GetMonthCanceledOrdersResponse>

  abstract getPopularProductsByRestaurant(
    restaurantId: string,
  ): Promise<GetPopularProductsByRestaurantResponse>

  abstract getOrdersInPeriod(params: GetOrdersInPeriodParams): Promise<Order[]>

  abstract update(order: Order): Promise<void>
}
