// dtos
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';

// entities
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByUserIdAndRefreshToken(
    user_id: string,
    token: string,
  ): Promise<UserTokens | undefined>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens | undefined>;
}

export { IUsersTokensRepository };
