import { Either, left, right } from '@/core/either'
import { Restaurant } from '@/domain/store/enterprise/entities'

import { RestaurantsRepository } from '../../repositories'
import { RestaurantNotFoundError } from '../_erros'

type Request = {
  restaurantId: string
}

type Response = Either<
  RestaurantNotFoundError,
  {
    restaurant: Restaurant
  }
>

export class GetRestaurantByIdUseCase {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) {}

  public async execute(params: Request): Promise<Response> {
    const { restaurantId } = params

    const restaurant = await this.restaurantsRepository.findById(restaurantId)

    if (!restaurant) {
      return left(new RestaurantNotFoundError())
    }

    return right({
      restaurant,
    })
  }
}
