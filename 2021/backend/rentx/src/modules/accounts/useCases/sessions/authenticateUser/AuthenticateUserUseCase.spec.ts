import { AppError } from '@shared/errors/AppError';

// fakes
import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository';
import { FakeHashUser } from '@modules/accounts/providers/HashUser/fakes/FakeHashUser';
import { FakeUsersTokensRepository } from '@modules/accounts/repositories/fakes/FakeUsersTokensRepository';

// providers
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';

// helpers
import { UsersBuilder } from '@modules/accounts/helpers/builders/UsersBuilder';

// services
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeHashUser: FakeHashUser;
let dayJsDateProvider: DayJsDateProvider;

let authenticateUser: AuthenticateUserUseCase;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeHashUser = new FakeHashUser();
    dayJsDateProvider = new DayJsDateProvider();
    authenticateUser = new AuthenticateUserUseCase(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeHashUser,
      dayJsDateProvider,
    );
  });

  it('should be able generate a token', async () => {
    const user = await fakeUsersRepository.create(new UsersBuilder().build());

    const response = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(() =>
      authenticateUser.execute({
        email: 'non-existing@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUsersRepository.create(new UsersBuilder().build());

    await expect(() =>
      authenticateUser.execute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
