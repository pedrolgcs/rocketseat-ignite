import { getRepository, Repository } from 'typeorm';

// dtos
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';

// interfaces
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

// entities
import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }

  public async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.ormRepository.create(data);

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async deleteById(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }

  public async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const usersTokens = await this.ormRepository.findOne({
      user_id,
      refresh_token,
    });
    return usersTokens;
  }

  public async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserTokens | undefined> {
    return this.ormRepository.findOne({ where: { refresh_token } });
  }
}

export { UsersTokensRepository };
