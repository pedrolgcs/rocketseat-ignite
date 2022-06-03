import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

// entities
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

// interfaces
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  public async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError("Car doesn't exists", 400);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    car.specifications = specifications;

    await this.carsRepository.save(car);

    return car;
  }
}

export { CreateCarSpecificationUseCase };
