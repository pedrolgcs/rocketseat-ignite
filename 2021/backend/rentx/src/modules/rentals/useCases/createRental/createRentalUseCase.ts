import { inject, injectable } from 'tsyringe';

// utils
import { AppError } from '@shared/errors/AppError';

// entities
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

// interfaces
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentalHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable', 400);
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progresse for user", 400);
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compare < minimumRentalHours) {
      throw new AppError('Invalid return time!', 400);
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
