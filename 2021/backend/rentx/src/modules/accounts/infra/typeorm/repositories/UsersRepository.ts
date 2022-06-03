import { getRepository, Repository } from 'typeorm';

// dtos
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

// intefaces
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

// entities
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { id } });

    return user;
  }

  findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { email } });

    return user;
  }
}

export { UsersRepository };
