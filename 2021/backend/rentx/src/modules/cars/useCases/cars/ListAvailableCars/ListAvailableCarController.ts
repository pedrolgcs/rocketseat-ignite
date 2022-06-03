import { Request, Response } from 'express';
import { container } from 'tsyringe';

// useCase
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;

    const listAvailableCars = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableCars.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    return response.status(200).json(cars);
  }
}

export { ListAvailableCarController };
