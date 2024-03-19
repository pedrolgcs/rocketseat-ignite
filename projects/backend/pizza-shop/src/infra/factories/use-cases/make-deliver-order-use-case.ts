import { DeliverOrderUseCase } from '@/domain/store/application/use-cases'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeDeliverOrderUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new DeliverOrderUseCase(ordersRepository)
}
