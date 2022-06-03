import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// services
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;

    const createUser = container.resolve(CreateUserUseCase);

    const user = await createUser.execute({
      name,
      email,
      password,
      driver_license,
    });

    return response.status(201).json(classToClass(user));
  }
}

export { CreateUserController };
