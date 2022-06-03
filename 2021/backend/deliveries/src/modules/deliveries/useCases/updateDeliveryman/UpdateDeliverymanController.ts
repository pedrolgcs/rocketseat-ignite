import { Request, Response } from 'express';

// useCase
import { UpdateDeliverymanUseCase } from './UpdateDeliverymanUseCase';

class UpdateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id: id_delivery } = request.params;
    const { id: id_deliveryman } = request.user;

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();

    const delivery = await updateDeliverymanUseCase.execute({
      id_delivery,
      id_deliveryman,
    });

    return response.status(201).json(delivery);
  }
}

export { UpdateDeliverymanController };
