import { Request, Response } from 'express';
import { container } from 'tsyringe';

// useCase
import { CreateRentalUseCase } from './createRentalUseCase';

class CreateRentalController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, expected_return_date } = request.body;

    const createCategory = container.resolve(CreateRentalUseCase);

    const rental = await createCategory.execute({
      user_id: request.user.id,
      car_id,
      expected_return_date,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
