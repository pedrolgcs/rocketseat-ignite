import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import * as Error from './errors'

type Request = {
  userId: string
}

type Response = {
  user: User
}

class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: Request): Promise<Response> {
    const { userId } = request

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error.ResourceNotFound()
    }

    return {
      user,
    }
  }
}

export { GetUserProfileUseCase }
