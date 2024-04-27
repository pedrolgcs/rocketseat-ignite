import { GetRestaurantRevenueByMonthUseCase } from '@/domain/store/application/use-cases/get-restaurant-revenue-by-month/get-restaurant-revenue-by-month-use-case'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeGetRestaurantRevenueByMonthUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new GetRestaurantRevenueByMonthUseCase(ordersRepository)
}
