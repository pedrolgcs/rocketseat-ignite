import { injectable, inject } from 'tsyringe';

// entities
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

// error handling
import { AppError } from '@shared/errors/AppError';

// repository
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

// interfaces
interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<Category> {
    const alreadyCategoryExists = await this.categoriesRepository.findByName(
      name,
    );

    if (alreadyCategoryExists) {
      throw new AppError('Category already exists', 400);
    }

    const category = this.categoriesRepository.create({ name, description });

    return category;
  }
}

export { CreateCategoryUseCase };
