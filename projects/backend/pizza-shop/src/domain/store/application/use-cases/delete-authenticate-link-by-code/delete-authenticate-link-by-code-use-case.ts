import { Either, right } from '@/core/either'
import { UsersAuthenticateRepository } from '@/domain/store/application/repositories'

type Request = {
  code: string
}

type Response = Either<null, null>

export class DeleteAuthenticateLinkByCodeUseCase {
  constructor(
    private readonly usersAuthenticateRepository: UsersAuthenticateRepository,
  ) {}

  public async execute(params: Request): Promise<Response> {
    const { code } = params
    await this.usersAuthenticateRepository.deleteByCode(code)
    return right(null)
  }
}
