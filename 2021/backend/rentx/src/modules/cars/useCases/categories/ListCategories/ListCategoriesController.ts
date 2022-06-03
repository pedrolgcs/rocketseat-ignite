import { Request, Response } from 'express';
import { container } from 'tsyringe';

// useCase
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  public async handle(_: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesUseCase);

    const categories = await listCategories.execute();

    return response.status(200).json(categories);
  }
}

export { ListCategoriesController };
