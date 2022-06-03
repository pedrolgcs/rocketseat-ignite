import { AppError } from '@shared/errors/AppError';

// helpers
import { CarsBuilder } from '@modules/cars/helpers/builders/CarsBuilder';
import { SpecificationsBuilder } from '@modules/cars/helpers/builders/SpecificationsBuilder';

// fakes
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeSpecificationsRepository } from '@modules/cars/repositories/fakes/FakeSpecificationsRepository';

// useCase
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

// inicialize
let fakeCarsRepository: FakeCarsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let fakeSpecificationsRepository: FakeSpecificationsRepository;

describe('CreateCarSpecification', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      fakeCarsRepository,
      fakeSpecificationsRepository,
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await fakeCarsRepository.create(new CarsBuilder().build());

    const specification_01 = await fakeSpecificationsRepository.create(
      new SpecificationsBuilder().setName('first').build(),
    );
    const specification_02 = await fakeSpecificationsRepository.create(
      new SpecificationsBuilder().setName('second').build(),
    );
    await fakeSpecificationsRepository.create(
      new SpecificationsBuilder().setName('third').build(),
    );

    const updatedCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification_01.id, specification_02.id],
    });

    expect(updatedCar.specifications).toEqual([
      specification_01,
      specification_02,
    ]);
  });

  it('should not be able to add a new specification if non-existing car', async () => {
    await expect(() =>
      createCarSpecificationUseCase.execute({
        car_id: 'no-existing-car',
        specifications_id: ['specification_id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
