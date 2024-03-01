import { createId } from '@paralleldrive/cuid2'

import { Either, left, right } from '@/core/either'
import { MailProvider } from '@/domain/store/application/providers'
import {
  UsersAuthenticateRepository,
  UsersRepository,
} from '@/domain/store/application/repositories'
import { UserAuthenticate } from '@/domain/store/enterprise/entities'
import { env } from '@/infra/env'

import { UserNotFoundError } from '../_erros'

type Request = {
  email: string
}

type Response = Either<
  UserNotFoundError,
  {
    url: string
  }
>

export class SendAuthenticateLinkUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersAuthenticateRepository: UsersAuthenticateRepository,
    private readonly mailProvider: MailProvider,
  ) {}

  public async execute(params: Request): Promise<Response> {
    const { email } = params

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new UserNotFoundError())
    }

    const authLinkCode = createId()

    const authentication = UserAuthenticate.create({
      code: authLinkCode,
      userId: user.id,
    })

    await this.usersAuthenticateRepository.create(authentication)

    const authLink = authentication.createURL(
      env.API_BASE_URL,
      env.AUTH_REDIRECT_URL,
    )

    this.mailProvider.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Link de autenticação',
      template: {
        file: 'auth_template',
        variables: {
          name: user.name,
          link: authLink.toString(),
        },
      },
    })

    return right({
      url: authLink.toString(),
    })
  }
}
