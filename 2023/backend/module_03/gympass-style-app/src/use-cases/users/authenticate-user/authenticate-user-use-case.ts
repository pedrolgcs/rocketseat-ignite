import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import * as Error from './errors'

type Request = {
  email: string
  password: string
}

type Response = {
  user: User
}

class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: Request): Promise<Response> {
    const { email, password } = request

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error.InvalidCredentials()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new Error.InvalidCredentials()
    }

    return {
      user,
    }
  }
}

export { AuthenticateUserUseCase }
