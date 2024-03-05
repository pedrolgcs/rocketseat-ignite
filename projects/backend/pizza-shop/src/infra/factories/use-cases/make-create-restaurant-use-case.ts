import { CreateRestaurantUseCase } from '@/domain/store/application/use-cases'
import {
  DrizzleRestaurantsRepository,
  DrizzleUsersRepository,
} from '@/infra/db/repositories'

export function makeCreateRestaurantUseCase() {
  const restaurantsRepository = new DrizzleRestaurantsRepository()
  const usersRepository = new DrizzleUsersRepository()

  return new CreateRestaurantUseCase(restaurantsRepository, usersRepository)
}
