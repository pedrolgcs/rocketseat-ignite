import { Either, right } from '@/core/either'
import { OrdersRepository } from '@/domain/store/application/repositories'
import { Order, OrderStatus } from '@/domain/store/enterprise/entities'

import { Pagination } from '../../@types/pagination'

type Request = {
  restaurantId: string
  perPage: number
  customerName?: string
  orderId?: string
  status?: OrderStatus
  pageIndex: number
}

type Response = Either<null, Pagination<Order>>

export class FetchOrdersByRestaurantIdUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute(params: Request): Promise<Response> {
    const { restaurantId, perPage, customerName, orderId, status, pageIndex } =
      params

    const paginationOrders = await this.ordersRepository.fetchByRestaurantId({
      restaurantId,
      perPage,
      orderId,
      customerName,
      status,
      pageIndex,
    })

    return right(paginationOrders)
  }
}
