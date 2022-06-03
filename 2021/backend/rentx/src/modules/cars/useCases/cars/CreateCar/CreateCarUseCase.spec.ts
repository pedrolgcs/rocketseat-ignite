import { AppError } from '@shared/errors/AppError';

// helpers
import { CarsBuilder } from '@modules/cars/helpers/builders/CarsBuilder';

// fakes
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

// useCase
import { CreateCarUseCase } from './CreateCarUseCase';

// inicialize
let fakeCarsRepository: FakeCarsRepository;
let createCarUseCase: CreateCarUseCase;

describe('CreateCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    createCarUseCase = new CreateCarUseCase(fakeCarsRepository);
  });

  it('should be able create a new car', async () => {
    const car = await createCarUseCase.execute(new CarsBuilder().build());

    expect(car).toHaveProperty('id');
    expect(car.name).toBe('Onix');
    expect(car.available).toBe(true);
  });

  it('should not be able create a new car with exists licence plate', async () => {
    await fakeCarsRepository.create(
      new CarsBuilder().setLicensePlate('same-license').build(),
    );

    await expect(() =>
      createCarUseCase.execute(
        new CarsBuilder().setLicensePlate('same-license').build(),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
