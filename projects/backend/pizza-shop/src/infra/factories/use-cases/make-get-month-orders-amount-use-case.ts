import { GetMonthOrdersAmountUseCase } from '@/domain/store/application/use-cases'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeGetMonthOrdersAmountUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new GetMonthOrdersAmountUseCase(ordersRepository)
}
