import { DispatchOrderUseCase } from '@/domain/store/application/use-cases'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeDispatchOrderUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new DispatchOrderUseCase(ordersRepository)
}
