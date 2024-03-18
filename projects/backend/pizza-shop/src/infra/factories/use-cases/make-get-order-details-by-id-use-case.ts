import { GetOrderDetailsByIdUseCase } from '@/domain/store/application/use-cases'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeGetOrderDetailsByIdUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new GetOrderDetailsByIdUseCase(ordersRepository)
}
