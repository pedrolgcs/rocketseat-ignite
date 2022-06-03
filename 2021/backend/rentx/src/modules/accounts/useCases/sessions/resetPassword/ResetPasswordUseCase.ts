import { injectable, inject } from 'tsyringe';

// error handling
import { AppError } from '@shared/errors/AppError';

// interfaces
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { IHashUser } from '@modules/accounts/providers/HashUser/models/IHashUser';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('HashUser')
    private hashUser: IHashUser,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token,
    );

    if (!userToken) {
      throw new AppError('Invalid Token!');
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('Token expired!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const passwordHash = await this.hashUser.generateHash(password);

    user.password = passwordHash;

    await this.usersRepository.save(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
