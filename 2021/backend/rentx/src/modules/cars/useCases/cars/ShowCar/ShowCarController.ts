import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// useCase
import { ShowCarUseCase } from './ShowCarUseCase';

class ShowCarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listAvailableCars = container.resolve(ShowCarUseCase);

    const cars = await listAvailableCars.execute({ id });

    return response.status(200).json(classToClass(cars));
  }
}

export { ShowCarController };
