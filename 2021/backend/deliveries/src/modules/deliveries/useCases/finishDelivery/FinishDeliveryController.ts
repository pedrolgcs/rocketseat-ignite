import { Request, Response } from 'express';

// useCase
import { FinishDeliveryUseCase } from './FinishDeliveryUseCase';

class FinishDeliveryController {
  async handle(request: Request, response: Response) {
    const { id: id_deliveryman } = request.user;
    const { id: id_delivery } = request.params;

    const finishDeliveryUseCase = new FinishDeliveryUseCase();
    const delivery = await finishDeliveryUseCase.execute({
      id_delivery,
      id_deliveryman,
    });

    return response.status(201).json(delivery);
  }
}

export { FinishDeliveryController };
