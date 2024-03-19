import { DeliveringOrderUseCase } from '@/domain/store/application/use-cases'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeDeliveringOrderUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new DeliveringOrderUseCase(ordersRepository)
}
