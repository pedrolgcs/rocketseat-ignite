import { GetDayOrdersAmountUseCase } from '@/domain/store/application/use-cases'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeGetDayOrdersAmountUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new GetDayOrdersAmountUseCase(ordersRepository)
}
