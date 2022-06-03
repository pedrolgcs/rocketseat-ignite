import { Request, Response } from 'express';

// useCase
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase';

class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();
    const token = await authenticateDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.status(200).json({ token });
  }
}

export { AuthenticateDeliverymanController };
