import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '@/application/modules/user/repositories/IUsersRepository'
import * as Error from './errors'

type IRequest = {
  sessionId: string
}

@injectable()
class SignInUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(request: IRequest): Promise<void> {
    const { sessionId } = request

    const user = await this.usersRepository.findById(sessionId)

    if (!user) {
      throw new Error.UserNotFound()
    }
  }
}

export { SignInUseCase }
