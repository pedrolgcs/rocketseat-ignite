import { injectable, inject } from 'tsyringe';

// entities
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

// repository
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  public async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
