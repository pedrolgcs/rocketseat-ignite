import { Request, Response } from 'express';
import { container } from 'tsyringe';

// useCase
import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      license_plate,
      brand,
      daily_rate,
      fine_amount,
      category_id,
    } = request.body;

    const createCar = container.resolve(CreateCarUseCase);

    const car = await createCar.execute({
      name,
      description,
      license_plate,
      brand,
      daily_rate,
      fine_amount,
      category_id,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
