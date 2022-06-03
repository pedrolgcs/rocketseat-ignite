import { v4 } from 'uuid';

// dtos
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';

// entities
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

// interfaces
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private userTokens: UserTokens[] = [];

  public async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { id: v4() }, data);

    this.userTokens.push(userToken);
    return userToken;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndexToken = this.userTokens.findIndex(token => token.id === id);
    this.userTokens.slice(findIndexToken, 1);
  }

  public async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserTokens | undefined> {
    return this.userTokens.find(
      userToken => userToken.refresh_token === refresh_token,
    );
  }

  public async findByUserIdAndRefreshToken(
    user_id: string,
    token: string,
  ): Promise<UserTokens | undefined> {
    return this.userTokens.find(
      userToken =>
        userToken.user_id === user_id && userToken.refresh_token === token,
    );
  }
}

export { FakeUsersTokensRepository };
