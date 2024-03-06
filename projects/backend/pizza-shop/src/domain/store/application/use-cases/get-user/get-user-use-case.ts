import { Either, left, right } from '@/core/either'
import { UsersRepository } from '@/domain/store/application/repositories'
import { User } from '@/domain/store/enterprise/entities'

import { UserNotFoundError } from '../_erros'

type Request = {
  userId: string
}

type Response = Either<
  UserNotFoundError,
  {
    user: User
  }
>

export class GetUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(params: Request): Promise<Response> {
    const { userId } = params

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    return right({ user })
  }
}
