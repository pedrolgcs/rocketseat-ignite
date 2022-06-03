import { Request, Response } from 'express';

// useCase
import { FindAllCurrentDeliveriesUseCase } from './FindAllCurrentDeliveriesUseCase';

// builder
import { QueryBuilder } from '@/shared/infra/http/helpers/builders/QueryBuilder';

class FindAllCurrentDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id: id_deliveryman } = request.user;
    const query = new QueryBuilder(request.query).build();

    const findAllCurrentDeliveriesUseCase = new FindAllCurrentDeliveriesUseCase();
    const deliveries = await findAllCurrentDeliveriesUseCase.execute({
      id_deliveryman,
      query,
    });

    return response.status(200).json(deliveries);
  }
}

export { FindAllCurrentDeliveriesController };
