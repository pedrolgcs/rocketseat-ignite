import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// services
import { ShowProfileUseCase } from './ShowProfileUseCase';

class ShowProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfile = container.resolve(ShowProfileUseCase);

    const user = await showProfile.execute(id);

    return response.status(200).json(classToClass(user));
  }
}

export { ShowProfileController };
