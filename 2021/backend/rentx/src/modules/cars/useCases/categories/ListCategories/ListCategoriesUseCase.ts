import { injectable, inject } from 'tsyringe';

// entities
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

// repository
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}
  public async execute(): Promise<Category[]> {
    const category = await this.categoriesRepository.list();

    return category;
  }
}

export { ListCategoriesUseCase };
