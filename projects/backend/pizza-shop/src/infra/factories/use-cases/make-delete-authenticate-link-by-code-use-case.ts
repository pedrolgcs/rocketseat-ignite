import { DeleteAuthenticateLinkByCodeUseCase } from '@/domain/store/application/use-cases'
import { DrizzleUsersAuthenticateRepository } from '@/infra/db/repositories'

export function makeDeleteAuthenticateLinkByCodeUseCase() {
  const usersAuthenticateRepository = new DrizzleUsersAuthenticateRepository()

  return new DeleteAuthenticateLinkByCodeUseCase(usersAuthenticateRepository)
}
