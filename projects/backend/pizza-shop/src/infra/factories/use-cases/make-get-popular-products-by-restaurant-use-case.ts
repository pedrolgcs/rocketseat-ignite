import { GetPopularProductsByRestaurantUseCase } from '@/domain/store/application/use-cases'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeGetPopularProductsByRestaurantUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new GetPopularProductsByRestaurantUseCase(ordersRepository)
}
