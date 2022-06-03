import { inject, injectable } from 'tsyringe';

// error handling
import { AppError } from '@shared/errors/AppError';

// dtos
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

// interfaces
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IHashUser } from '@modules/accounts/providers/HashUser/models/IHashUser';

// entities
import { User } from '@modules/accounts/infra/typeorm/entities/User';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashUser')
    private hashUser: IHashUser,
  ) {}

  public async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const emailAlreadyUsed = await this.usersRepository.findByEmail(email);

    if (emailAlreadyUsed) {
      throw new AppError('E-mail already used', 400);
    }

    const passwordHash = await this.hashUser.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });

    return user;
  }
}

export { CreateUserUseCase };
