import dayjs from 'dayjs';

// utils
import { AppError } from '@shared/errors/AppError';

// helpers
import { CarsBuilder } from '@modules/cars/helpers/builders/CarsBuilder';
import { RentalsBuilder } from '@modules/rentals/helpers/builders/RentalsBuilder';

// fakes
import { FakeRentalsRepository } from '@modules/rentals/repositories/fakes/FakeRentalsRepository';
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

// providers
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';

// useCase
import { DevolutionRentalUseCase } from './devolutionRentalUseCase';

// inicialize
let devolutionRentalUseCase: DevolutionRentalUseCase;
let fakeRentalsRepository: FakeRentalsRepository;
let fakeCarsRepository: FakeCarsRepository;
let dayJsDateProvider: DayJsDateProvider;
let dayAdd48Hours: Date;

describe('DevolutionRental', () => {
  beforeAll(() => {
    const now = new Date();
    dayAdd48Hours = new Date(now.setHours(now.getHours() + 48));
  });

  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    fakeCarsRepository = new FakeCarsRepository();
    dayJsDateProvider = new DayJsDateProvider();
    devolutionRentalUseCase = new DevolutionRentalUseCase(
      fakeRentalsRepository,
      fakeCarsRepository,
      dayJsDateProvider,
    );
  });

  it('should be able to devolution a rental', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(dayjs().add(2, 'days').toDate()).getTime();
    });

    const car = await fakeCarsRepository.create(
      new CarsBuilder().setDailyRate(100).build(),
    );

    const rental = await fakeRentalsRepository.create(
      new RentalsBuilder()
        .setCarId(car.id)
        .setExpectedReturnDate(dayAdd48Hours)
        .builder(),
    );

    const devolution = await devolutionRentalUseCase.execute({
      id: rental.id,
      user_id: '123',
    });

    expect(devolution.total).toBe(200);
  });

  it('should be able to charge a two-day late fee in devolution', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(dayjs().add(4, 'days').toDate()).getTime();
    });

    const car = await fakeCarsRepository.create(
      new CarsBuilder().setDailyRate(100).setFineAmount(100).build(),
    );

    const rental = await fakeRentalsRepository.create(
      new RentalsBuilder()
        .setCarId(car.id)
        .setExpectedReturnDate(dayAdd48Hours)
        .builder(),
    );

    const devolution = await devolutionRentalUseCase.execute({
      id: rental.id,
      user_id: '123',
    });

    expect(devolution.total).toBe(600);
  });

  it('should not be able to devolution a rental if non-existing', async () => {
    await expect(() =>
      devolutionRentalUseCase.execute({
        id: 'non-existing',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to devolution a rental if already made', async () => {
    const rental = await fakeRentalsRepository.create(
      new RentalsBuilder().setCarId('123').setEndDate(new Date()).builder(),
    );

    await expect(() =>
      devolutionRentalUseCase.execute({
        id: rental.id,
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
