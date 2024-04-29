import { GetDayOrdersAmountUseCase } from '@/domain/store/application/use-cases/get-day-orders-amount/get-day-orders-amount-use-case'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeGetDayOrdersAmountUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new GetDayOrdersAmountUseCase(ordersRepository)
}
