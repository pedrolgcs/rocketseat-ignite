import { Request, Response } from 'express';
import { container } from 'tsyringe';

// useCase
import { DevolutionRentalUseCase } from './devolutionRentalUseCase';

class DevolutionRentalController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const devolutionRental = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRental.execute({
      user_id: request.user.id,
      id,
    });

    return response.status(201).json(rental);
  }
}

export { DevolutionRentalController };
