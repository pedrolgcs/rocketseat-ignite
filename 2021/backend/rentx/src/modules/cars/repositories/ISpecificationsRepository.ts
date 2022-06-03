import { Specification } from '../infra/typeorm/entities/Specification';

// dtos
import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<Specification>;
  list(): Promise<Specification[]>;
  findById(id: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[]>;
  findByName(name: string): Promise<Specification | undefined>;
}

export { ISpecificationsRepository };
