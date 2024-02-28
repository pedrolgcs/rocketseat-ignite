import { Either, left, right } from '@/core/either'
import { UsersRepository } from '@/domain/store/application/repositories'
import { User } from '@/domain/store/enterprise/entities'

import { EmailAlreadyUsedError } from '../_erros'

type Request = {
  name: string
  email: string
  phone?: string
}

type Response = Either<
  EmailAlreadyUsedError,
  {
    manager: User
  }
>

export class CreateManagerUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { name, email, phone } = request

    const emailAlreadyUsed = await this.usersRepository.findByEmail(email)

    if (emailAlreadyUsed) {
      return left(new EmailAlreadyUsedError())
    }

    const manager = User.create({
      name,
      email,
      phone,
      role: 'manager',
    })

    await this.usersRepository.create(manager)

    return right({ manager })
  }
}
