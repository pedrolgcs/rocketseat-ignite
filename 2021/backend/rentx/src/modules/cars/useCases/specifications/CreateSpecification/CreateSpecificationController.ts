import { Request, Response } from 'express';
import { container } from 'tsyringe';

// useCase
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecification = container.resolve(CreateSpecificationUseCase);

    const specification = await createSpecification.execute({
      name,
      description,
    });

    return response.status(201).json(specification);
  }
}

export { CreateSpecificationController };
