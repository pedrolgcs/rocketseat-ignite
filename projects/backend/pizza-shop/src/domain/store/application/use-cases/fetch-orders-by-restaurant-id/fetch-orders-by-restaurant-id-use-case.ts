import { Either, right } from '@/core/either'
import { Pagination } from '@/domain/store/application/@types/pagination'
import { OrdersRepository } from '@/domain/store/application/repositories'
import type { OrderWithCustomer } from '@/domain/store/application/repositories/orders-repository'
import { OrderStatus } from '@/domain/store/enterprise/entities'

type Request = {
  restaurantId: string
  perPage: number
  customerName?: string
  orderId?: string
  status?: OrderStatus
  pageIndex: number
}

type Response = Either<null, Pagination<OrderWithCustomer>>

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
