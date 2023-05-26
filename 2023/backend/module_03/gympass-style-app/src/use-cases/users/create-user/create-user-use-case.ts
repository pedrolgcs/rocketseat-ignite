import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import * as Error from './errors'

type Request = {
  name: string
  email: string
  password: string
}

class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: Request) {
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

    return user
  }
}

export { RegisterUseCase }
