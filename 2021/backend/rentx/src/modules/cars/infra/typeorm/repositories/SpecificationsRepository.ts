import { Repository, getRepository } from 'typeorm';

// repository interface
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

// dtos
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';

// entities
import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  public async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.ormRepository.create(data);

    await this.ormRepository.save(specification);

    return specification;
  }

  public async list(): Promise<Specification[]> {
    const specifications = await this.ormRepository.find({
      order: { name: 'ASC' },
    });
    return specifications;
  }

  public async findById(id: string): Promise<Specification | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    return this.ormRepository.findByIds(ids);
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.ormRepository.findOne({ where: { name } });

    return specification;
  }
}

export { SpecificationsRepository };
