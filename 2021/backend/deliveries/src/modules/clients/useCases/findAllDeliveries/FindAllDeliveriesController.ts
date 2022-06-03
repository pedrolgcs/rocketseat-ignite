import { Request, Response } from 'express';

// useCase
import { FindAllDeliveriesUseCase } from './FindAllDeliveriesUseCase';

class FindAllDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id: id_client } = request.user;

    const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase();
    const deliveries = await findAllDeliveriesUseCase.execute({ id_client });

    return response.status(200).json(deliveries);
  }
}

export { FindAllDeliveriesController };
