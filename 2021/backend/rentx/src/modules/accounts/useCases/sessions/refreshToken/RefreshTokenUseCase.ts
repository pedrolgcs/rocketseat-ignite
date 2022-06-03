import { injectable, inject } from 'tsyringe';
import { verify, sign } from 'jsonwebtoken';

// error handling
import { AppError } from '@shared/errors/AppError';

// config
import authConfig from '@config/auth';

// interfaces
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';

interface IRequest {
  token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}
@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ token }: IRequest): Promise<ITokenResponse> {
    const { secret, expiresIn, expiresInDays } = authConfig.refresh_token;

    const { sub: user_id, email } = verify(token, secret) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, secret, {
      subject: user_id,
      expiresIn,
    });

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date: this.dateProvider.addDays(expiresInDays),
    });

    const newToken = sign({}, authConfig.jwt.secret, {
      subject: user_id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { refresh_token, token: newToken };
  }
}

export { RefreshTokenUseCase };
