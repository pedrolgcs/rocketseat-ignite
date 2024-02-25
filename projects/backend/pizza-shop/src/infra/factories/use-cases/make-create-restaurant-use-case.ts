import { CreateRestaurantUseCase } from '@/domain/store/application/use-cases'
import {
  DrizzleManagersRepository,
  DrizzleRestaurantsRepository,
} from '@/infra/db/repositories'

export function makeCreateRestaurantUseCase() {
  const restaurantsRepository = new DrizzleRestaurantsRepository()
  const managersRepository = new DrizzleManagersRepository()
  return new CreateRestaurantUseCase(restaurantsRepository, managersRepository)
}
