import { v4 } from 'uuid';

// entities
import { User } from '@modules/accounts/infra/typeorm/entities/User';

// dtos
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

// repository
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, data);

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(findUser => findUser.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(findUser => findUser.email === email);
  }
}

export { FakeUsersRepository };
