import { Either, right } from '@/core/either'
import { Product } from '@/domain/store/enterprise/entities'

import { OrdersRepository } from '../../repositories'

type Request = {
  restaurantId: string
}

type Response = Either<
  null,
  {
    products: {
      product: Product
      amount: number
    }[]
  }
>

export class GetPopularProductsByRestaurantUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute(params: Request): Promise<Response> {
    const { restaurantId } = params

    const popularProducts =
      await this.ordersRepository.getPopularProductsByRestaurant(restaurantId)

    return right({
      products: popularProducts,
    })
  }
}
