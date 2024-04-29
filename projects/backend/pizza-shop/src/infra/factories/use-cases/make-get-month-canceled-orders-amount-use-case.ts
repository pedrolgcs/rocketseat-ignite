import { GetMonthCanceledOrdersAmountUseCase } from '@/domain/store/application/use-cases'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeGetMonthCanceledOrdersAmountUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new GetMonthCanceledOrdersAmountUseCase(ordersRepository)
}
