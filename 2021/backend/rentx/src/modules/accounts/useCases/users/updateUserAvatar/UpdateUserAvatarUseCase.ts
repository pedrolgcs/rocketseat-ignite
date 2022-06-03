import { inject, injectable } from 'tsyringe';

// error handling
import { AppError } from '@shared/errors/AppError';

// interfaces
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';

// entities
import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 400);
    }

    // remove file if exists
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar, 'avatar');
    }

    // move file to custom folder
    await this.storageProvider.saveFile(avatarFileName, 'avatar');

    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarUseCase };
