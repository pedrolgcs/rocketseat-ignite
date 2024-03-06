import { GetUserUseCase } from '@/domain/store/application/use-cases/get-user/get-user-use-case'
import { DrizzleUsersRepository } from '@/infra/db/repositories'

export function makeGetUserUseCase() {
  const usersRepository = new DrizzleUsersRepository()

  return new GetUserUseCase(usersRepository)
}
