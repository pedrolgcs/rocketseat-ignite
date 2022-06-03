import { v4 } from 'uuid';

// entities
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

// dtos
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';

// repository
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

class FakeSpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  public async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { id: v4() }, data);

    this.specifications.push(specification);
    return specification;
  }

  public async list(): Promise<Specification[]> {
    return this.specifications;
  }

  public async findById(id: string): Promise<Specification | undefined> {
    return this.specifications.find(specification => specification.id === id);
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(specification =>
      ids.includes(specification.id),
    );
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    const existsSpecification = this.specifications.find(
      specification => specification.name === name,
    );

    return existsSpecification;
  }
}

export { FakeSpecificationsRepository };
