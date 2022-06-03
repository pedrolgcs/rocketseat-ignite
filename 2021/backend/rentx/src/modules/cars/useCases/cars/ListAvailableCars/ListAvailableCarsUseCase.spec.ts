// helpers
import { CarsBuilder } from '@modules/cars/helpers/builders/CarsBuilder';

// fakes
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

// useCase
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

// inicialize
let fakeCarsRepository: FakeCarsRepository;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('ListCars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(fakeCarsRepository);
  });

  it('should be able to list a available cars', async () => {
    await fakeCarsRepository.create(
      new CarsBuilder()
        .setName('Ferrari')
        .setBrand('ferrari')
        .setLicensePlate('001')
        .build(),
    );

    await fakeCarsRepository.create(
      new CarsBuilder()
        .setName('Camaro')
        .setBrand('chevrolet')
        .setLicensePlate('002')
        .build(),
    );

    await fakeCarsRepository.create(
      new CarsBuilder()
        .setName('Gol')
        .setBrand('volkswagen')
        .setLicensePlate('003')
        .setAvailable(false)
        .build(),
    );

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toHaveLength(2);
  });

  it('should be able to list a available cars using filters', async () => {
    await fakeCarsRepository.create(
      new CarsBuilder()
        .setName('Ferrari')
        .setBrand('ferrari')
        .setLicensePlate('001')
        .build(),
    );

    await fakeCarsRepository.create(
      new CarsBuilder()
        .setName('Camaro')
        .setBrand('chevrolet')
        .setLicensePlate('002')
        .build(),
    );

    await fakeCarsRepository.create(
      new CarsBuilder()
        .setName('Gol')
        .setBrand('volkswagen')
        .setLicensePlate('003')
        .setAvailable(false)
        .build(),
    );

    const params = {
      name: 'Ferrari',
      brand: 'ferrari',
      category_id: '',
    };

    const cars = await listAvailableCarsUseCase.execute(params);

    expect(cars).toHaveLength(1);
    expect(cars[0].name).toBe('Ferrari');
  });
});
