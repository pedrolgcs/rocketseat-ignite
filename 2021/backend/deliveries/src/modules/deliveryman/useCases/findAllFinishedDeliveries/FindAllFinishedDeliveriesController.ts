import { Request, Response } from 'express';

// useCase
import { FindAllFinishedDeliveries } from './FindAllFinishedDeliveriesUseCase';

// builders
import { QueryBuilder } from '@/shared/infra/http/helpers/builders/QueryBuilder';

class FindAllFinishedDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id: id_deliveryman } = request.user;
    const query = new QueryBuilder(request.query).build();

    const findAllFinishedDeliveries = new FindAllFinishedDeliveries();
    const deliveries = await findAllFinishedDeliveries.execute({
      id_deliveryman,
      query,
    });

    return response.status(200).json(deliveries);
  }
}

export { FindAllFinishedDeliveriesController };
