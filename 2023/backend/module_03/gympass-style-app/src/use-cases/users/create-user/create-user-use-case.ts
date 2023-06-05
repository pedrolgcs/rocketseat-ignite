import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import * as Error from './errors'

type Request = {
  name: string
  email: string
  password: string
}

type Response = {
  user: User
}

class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: Request): Promise<Response> {
    const { name, email, password } = request

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error.UserAlreadyExists()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

    return {
      user,
    }
  }
}

export { CreateUserUseCase }
