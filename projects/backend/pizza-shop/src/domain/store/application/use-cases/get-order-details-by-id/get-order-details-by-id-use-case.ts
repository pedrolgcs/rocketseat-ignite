import { Either, left, right } from '@/core/either'
import { Order, OrderItem, User } from '@/domain/store/enterprise/entities'

import { OrdersRepository } from '../../repositories'
import { OrderNotFoundError } from '../_erros'

type Request = {
  orderId: string
}

type Response = Either<
  OrderNotFoundError,
  {
    order: Order
    customer: User | null
    orderItems: OrderItem[]
  }
>

export class GetOrderDetailsByIdUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute(params: Request): Promise<Response> {
    const { orderId } = params

    const orderDetails =
      await this.ordersRepository.findByIdWithRelations(orderId)

    if (!orderDetails) {
      return left(new OrderNotFoundError())
    }

    return right({
      order: orderDetails.order,
      customer: orderDetails.customer,
      orderItems: orderDetails.orderItems,
    })
  }
}
