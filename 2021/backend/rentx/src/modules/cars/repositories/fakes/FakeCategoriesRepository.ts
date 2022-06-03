import { v4 } from 'uuid';

// entities
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

// dtos
import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';

// repository
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async list(): Promise<Category[]> {
    return this.categories;
  }

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: v4() }, data);

    this.categories.push(category);
    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const existsCategory = this.categories.find(
      category => category.name === name,
    );

    return existsCategory;
  }
}

export { FakeCategoriesRepository };
