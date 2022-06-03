import { Request, Response } from 'express';

// useCase
import { FindAllAvailableUseCase } from './FindAllAvailableUseCase';

class FindAllAvailableController {
  async handle(_: Request, response: Response) {
    const findAllAvailableUseCase = new FindAllAvailableUseCase();
    const deliveries = await findAllAvailableUseCase.execute();

    return response.status(200).json(deliveries);
  }
}

export { FindAllAvailableController };
