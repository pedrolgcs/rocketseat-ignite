import { CreateManagerUseCase } from '@/domain/store/application/use-cases'
import { DrizzleManagersRepository } from '@/infra/db/repositories'

export function makeCreateManagerUseCase() {
  const managersRepository = new DrizzleManagersRepository()
  return new CreateManagerUseCase(managersRepository)
}
