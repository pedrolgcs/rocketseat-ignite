import { Request, Response } from 'express';

import { container } from 'tsyringe';

// useCase
import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

class ImportCategoriesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategories = container.resolve(ImportCategoriesUseCase);

    importCategories.execute({ file });

    return response.status(201).json({ message: 'imported categories' });
  }
}

export { ImportCategoriesController };
