import { Either, left, right } from '@/core/either'
import { SmtpProvider } from '@/domain/store/application/providers'
import { UsersRepository } from '@/domain/store/application/repositories'

import { UserNotFoundError } from '../_erros'

type Request = {
  email: string
}

type Response = Either<UserNotFoundError, null>

export class SendAuthenticateLinkUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly smtpProvider: SmtpProvider,
  ) {}

  public async execute(params: Request): Promise<Response> {
    const { email } = params

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new UserNotFoundError())
    }

    await this.smtpProvider.sendEmail()

    return right(null)
  }
}
