import { CreateManagerUseCase } from '@/domain/store/application/use-cases'
import { DrizzleUsersRepository } from '@/infra/db/repositories'

export function makeCreateManagerUseCase() {
  const usersRepository = new DrizzleUsersRepository()
  return new CreateManagerUseCase(usersRepository)
}
