import { inject, injectable } from 'tsyringe'
import { User } from '@/application/modules/user/entities'
import { IUsersRepository } from '@/application/modules/user/repositories/IUsersRepository'
import * as Error from './errors'

type IRequest = {
  name: string
  email: string
  avatarUrl: string
}

type IResponse = {
  user: User
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(request: IRequest): Promise<IResponse> {
    const { name, email, avatarUrl } = request

    const emailAlreadyUsed = await this.userRepository.findByEmail(email)

    if (emailAlreadyUsed) {
      throw new Error.EmailAlreadyUsed()
    }

    const user = User.create({
      name,
      email,
      avatarUrl,
    })

    await this.userRepository.create(user)

    return {
      user,
    }
  }
}

export { CreateUserUseCase }
