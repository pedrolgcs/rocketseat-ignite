import { Category } from '../infra/typeorm/entities/Category';

// dtos
import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
}

export { ICategoriesRepository };
