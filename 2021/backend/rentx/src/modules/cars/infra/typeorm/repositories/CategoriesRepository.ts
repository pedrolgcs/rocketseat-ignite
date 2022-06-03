import { Repository, getRepository } from 'typeorm';

// repository interface
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

// dtos
import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';

// entities
import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(data);

    await this.ormRepository.save(category);

    return category;
  }

  public async list(): Promise<Category[]> {
    const categories = await this.ormRepository.find({
      order: { name: 'ASC' },
    });
    return categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ where: { name } });

    return category;
  }
}

export { CategoriesRepository };
