import { CancelOrderUseCase } from '@/domain/store/application/use-cases'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeCancelOrderUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new CancelOrderUseCase(ordersRepository)
}
