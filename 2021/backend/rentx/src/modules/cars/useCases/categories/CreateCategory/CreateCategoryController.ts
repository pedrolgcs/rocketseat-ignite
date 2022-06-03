import { Request, Response } from 'express';
import { container } from 'tsyringe';

// useCase
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategory = container.resolve(CreateCategoryUseCase);

    const category = await createCategory.execute({ name, description });

    return response.status(201).json(category);
  }
}

export { CreateCategoryController };
