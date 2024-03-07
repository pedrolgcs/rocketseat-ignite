import { GetRestaurantByIdUseCase } from '@/domain/store/application/use-cases'
import { DrizzleRestaurantsRepository } from '@/infra/db/repositories'

export function makeGetRestaurantByIdUseCase() {
  const restaurantsRepository = new DrizzleRestaurantsRepository()

  return new GetRestaurantByIdUseCase(restaurantsRepository)
}
