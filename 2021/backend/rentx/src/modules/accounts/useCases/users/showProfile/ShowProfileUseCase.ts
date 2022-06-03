import { inject, injectable } from 'tsyringe';

// error handling
import { AppError } from '@shared/errors/AppError';

// interfaces
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

// entities
import { User } from '@modules/accounts/infra/typeorm/entities/User';

@injectable()
class ShowProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 400);
    }

    return user;
  }
}

export { ShowProfileUseCase };
