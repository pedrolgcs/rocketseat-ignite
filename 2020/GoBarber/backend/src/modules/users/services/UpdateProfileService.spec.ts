// Shared
import AppError from '@shared/errors/AppError';

// Fakes
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

// Services
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Spider',
      email: 'spider@gmail.com',
    });

    expect(updatedUser.name).toBe('Spider');
    expect(updatedUser.email).toBe('spider@gmail.com');
  });

  it('should not be able to update the profile non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Spider',
        email: 'spider@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Spider',
      email: 'spider@gmail.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'peter@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Spider',
        email: 'spider@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Spider',
      email: 'spider@gmail.com',
      old_password: '123123',
      password: '321321',
    });

    expect(updatedUser.password).toBe('321321');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Spider',
        email: 'spider@gmail.com',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Spider',
        email: 'spider@gmail.com',
        old_password: 'wrong-old-password',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
