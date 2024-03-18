import { Either, left, right } from '@/core/either'
import { OrdersRepository } from '@/domain/store/application/repositories'
import { Order } from '@/domain/store/enterprise/entities'

import { ApproveOrderError, OrderNotFoundError } from '../_erros'

type Request = {
  orderId: string
  managedRestaurantId: string
}

type Response = Either<
  OrderNotFoundError | ApproveOrderError,
  {
    order: Order
  }
>

export class ApproveOrderUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute(params: Request): Promise<Response> {
    const { orderId, managedRestaurantId } = params

    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new OrderNotFoundError())
    }

    if (order.restaurantId.toString() !== managedRestaurantId) {
      return left(new OrderNotFoundError())
    }

    try {
      order.approve()
    } catch {
      return left(new ApproveOrderError())
    }

    await this.ordersRepository.update(order)

    return right({
      order,
    })
  }
}
