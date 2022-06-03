import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

// error handling
import { AppError } from '@shared/errors/AppError';

// config
import authConfig from '@config/auth';

// Entities
import { User } from '@modules/accounts/infra/typeorm/entities/User';

// interfaces
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IHashUser } from '@modules/accounts/providers/HashUser/models/IHashUser';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('HashUser')
    private hashUser: IHashUser,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect', 404);
    }

    const passwordMatched = await this.hashUser.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenExpiresIn,
      expiresInDays,
    } = authConfig.refresh_token;

    const refresh_token = sign({ email }, refreshTokenSecret, {
      subject: user.id,
      expiresIn: refreshTokenExpiresIn,
    });

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: this.dateProvider.addDays(expiresInDays),
    });

    return { user, token, refresh_token };
  }
}

export { AuthenticateUserUseCase };
