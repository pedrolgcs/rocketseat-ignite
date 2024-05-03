import { GetDailyRevenueInPeriodUseCase } from '@/domain/store/application/use-cases'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeGetDailyRevenueInPeriodUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new GetDailyRevenueInPeriodUseCase(ordersRepository)
}
