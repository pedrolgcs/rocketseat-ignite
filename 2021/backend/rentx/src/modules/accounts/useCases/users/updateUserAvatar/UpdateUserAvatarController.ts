import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// services
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const avatarFileName = request.file.filename;

    const updateAvatar = container.resolve(UpdateUserAvatarUseCase);

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFileName,
    });

    return response.status(201).json(classToClass(user));
  }
}

export { UpdateUserAvatarController };
