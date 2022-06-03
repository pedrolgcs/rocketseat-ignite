import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// services
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserUseCase);

    const { user, token, refresh_token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.status(201).json({
      user: classToClass(user),
      token,
      refresh_token,
    });
  }
}

export { AuthenticateUserController };
