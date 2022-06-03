import { inject, injectable } from 'tsyringe';

// entities
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

// interfaces
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute(queries: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(queries);

    return cars;
  }
}

export { ListAvailableCarsUseCase };
