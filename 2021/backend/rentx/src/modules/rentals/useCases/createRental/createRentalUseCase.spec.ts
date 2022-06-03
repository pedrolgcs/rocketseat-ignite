// helpers
import { UsersBuilder } from '@modules/accounts/helpers/builders/UsersBuilder';
import { CarsBuilder } from '@modules/cars/helpers/builders/CarsBuilder';

// fakes
import { FakeRentalsRepository } from '@modules/rentals/repositories/fakes/FakeRentalsRepository';
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { AppError } from '@shared/errors/AppError';

// providers
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';

// useCase
import { CreateRentalUseCase } from './createRentalUseCase';

// inicialize
let createRentalUseCase: CreateRentalUseCase;
let fakeRentalsRepository: FakeRentalsRepository;
let fakeCarsRepository: FakeCarsRepository;
let dayJsDateProvider: DayJsDateProvider;
let dayAdd24Hours: Date;

describe('CreateRental', () => {
  beforeAll(() => {
    const now = new Date();
    dayAdd24Hours = new Date(now.setHours(now.getHours() + 24));
  });

  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    fakeCarsRepository = new FakeCarsRepository();
    dayJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      fakeRentalsRepository,
      fakeCarsRepository,
      dayJsDateProvider,
    );
  });

  it('should be able to create a new rental', async () => {
    const user = new UsersBuilder().build();
    const car = await fakeCarsRepository.create(new CarsBuilder().build());

    const rental = await createRentalUseCase.execute({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const user = new UsersBuilder().build();
    const car_01 = await fakeCarsRepository.create(new CarsBuilder().build());
    const car_02 = await fakeCarsRepository.create(new CarsBuilder().build());

    await createRentalUseCase.execute({
      user_id: user.id,
      car_id: car_01.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(() =>
      createRentalUseCase.execute({
        user_id: user.id,
        car_id: car_02.id,
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const car = await fakeCarsRepository.create(new CarsBuilder().build());

    await createRentalUseCase.execute({
      user_id: 'user_id',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(() =>
      createRentalUseCase.execute({
        user_id: 'other_user_id',
        car_id: car.id,
        expected_return_date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if with invalid return time', async () => {
    const car = await fakeCarsRepository.create(new CarsBuilder().build());
    const user = new UsersBuilder().build();

    await expect(() =>
      createRentalUseCase.execute({
        user_id: user.id,
        car_id: car.id,
        expected_return_date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
