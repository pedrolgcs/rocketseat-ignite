// helpers
import { CarsBuilder } from '@modules/cars/helpers/builders/CarsBuilder';

import { AppError } from '@shared/errors/AppError';

// fakes
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

// useCase
import { ShowCarUseCase } from './ShowCarUseCase';

// inicialize
let fakeCarsRepository: FakeCarsRepository;
let showCarUseCase: ShowCarUseCase;

describe('ListCars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    showCarUseCase = new ShowCarUseCase(fakeCarsRepository);
  });

  it('should be able to show a car by ID', async () => {
    const car = await fakeCarsRepository.create(
      new CarsBuilder()
        .setName('Ferrari')
        .setBrand('ferrari')
        .setLicensePlate('001')
        .build(),
    );

    const findCar = await showCarUseCase.execute({ id: car.id });

    expect(findCar).toEqual(car);
  });

  it('should not be able to show if non-existing car', async () => {
    await expect(() =>
      showCarUseCase.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
