import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

// entities
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

// interfaces
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError('Car does not exist', 400);
    }

    return car;
  }
}

export { ShowCarUseCase };
