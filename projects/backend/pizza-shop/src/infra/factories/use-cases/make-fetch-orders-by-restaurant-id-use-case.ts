import { FetchOrdersByRestaurantIdUseCase } from '@/domain/store/application/use-cases/fetch-orders-by-restaurant-id/fetch-orders-by-restaurant-id-use-case'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeFetchOrdersByRestaurantIdUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new FetchOrdersByRestaurantIdUseCase(ordersRepository)
}
