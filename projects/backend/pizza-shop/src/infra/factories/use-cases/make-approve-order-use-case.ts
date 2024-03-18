import { ApproveOrderUseCase } from '@/domain/store/application/use-cases'
import { DrizzleOrdersRepository } from '@/infra/db/repositories'

export function makeApproveOrderUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new ApproveOrderUseCase(ordersRepository)
}
