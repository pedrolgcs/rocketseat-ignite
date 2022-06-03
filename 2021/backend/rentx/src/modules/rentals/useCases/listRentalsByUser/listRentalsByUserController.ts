import { Request, Response } from 'express';
import { container } from 'tsyringe';

// useCase
import { ListRentalsByUserUseCase } from './listRentalsByUserUseCase';

class ListRentalsByUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listRentalsByUser = container.resolve(ListRentalsByUserUseCase);

    const rentals = await listRentalsByUser.execute({
      user_id: request.user.id,
    });

    return response.status(201).json(rentals);
  }
}

export { ListRentalsByUserController };
