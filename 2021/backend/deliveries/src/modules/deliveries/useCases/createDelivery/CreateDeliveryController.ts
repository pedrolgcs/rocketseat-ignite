import { Request, Response } from 'express';

// useCase
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { item_name } = request.body;
    const { id: id_client } = request.user;

    const createDeliveryUseCase = new CreateDeliveryUseCase();
    const delivery = await createDeliveryUseCase.execute({
      id_client,
      item_name,
    });

    return response.status(201).json(delivery);
  }
}

export { CreateDeliveryController };
