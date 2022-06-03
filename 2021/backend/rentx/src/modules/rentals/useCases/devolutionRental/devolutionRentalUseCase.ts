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
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const minimum_daily = 1;

    if (!rental) {
      throw new AppError('Rental does not exists', 400);
    }

    if (rental.end_date) {
      throw new AppError('Rental devolution already made', 400);
    }

    const car = await this.carsRepository.findById(rental.car_id);

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      new Date(Date.now()),
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      new Date(Date.now()),
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total += calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = new Date();
    rental.total = total;

    await this.carsRepository.updateAvailable(car.id, true);

    return this.rentalsRepository.save(rental);
  }
}

export { DevolutionRentalUseCase };
