// helpers
import { CarsBuilder } from '@modules/cars/helpers/builders/CarsBuilder';
import { CarsImagesBuilder } from '@modules/cars/helpers/builders/CarsImagesBuilder';

import { AppError } from '@shared/errors/AppError';

// fakes
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeCarsImagesRepository } from '@modules/cars/repositories/fakes/FakeCarsImagesRepository';
import { FakeStorageProvider } from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

// useCase
import { DeleteCarImagesUseCase } from './DeleteCarImagesUseCase';

// inicialize
let fakeCarsRepository: FakeCarsRepository;
let fakeCarsImagesRepository: FakeCarsImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteCarImagesUseCase: DeleteCarImagesUseCase;

describe('UploadCarImages', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeCarsImagesRepository = new FakeCarsImagesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    deleteCarImagesUseCase = new DeleteCarImagesUseCase(
      fakeCarsRepository,
      fakeCarsImagesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to delete a car image', async () => {
    const car = await fakeCarsRepository.create(new CarsBuilder().build());

    const image_01 = await fakeCarsImagesRepository.create(
      new CarsImagesBuilder().build(),
    );
    const image_02 = await fakeCarsImagesRepository.create(
      new CarsImagesBuilder().build(),
    );
    const image_03 = await fakeCarsImagesRepository.create(
      new CarsImagesBuilder().build(),
    );

    await expect(() =>
      deleteCarImagesUseCase.execute({
        car_id: car.id,
        car_image_ids: [image_01.id, image_02.id, image_03.id],
      }),
    ).resolves.not.toThrowError;
  });

  it('should not be able to delete a non existing car', async () => {
    const car_image_ids = ['first_id', 'second_id', 'third_id'];

    await expect(() =>
      deleteCarImagesUseCase.execute({
        car_id: 'non-existing-car',
        car_image_ids,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
