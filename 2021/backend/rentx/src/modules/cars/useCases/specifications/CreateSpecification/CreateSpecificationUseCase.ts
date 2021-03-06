import { injectable, inject } from 'tsyringe';

// entities
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

// error handling
import { AppError } from '@shared/errors/AppError';

// repository
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

// interfaces
interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  public async execute({
    name,
    description,
  }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(
      name,
    );

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists', 400);
    }

    const specification = this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
