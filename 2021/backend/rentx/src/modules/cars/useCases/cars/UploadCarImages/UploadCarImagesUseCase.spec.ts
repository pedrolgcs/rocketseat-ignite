// helpers
import { CarsBuilder } from '@modules/cars/helpers/builders/CarsBuilder';

import { AppError } from '@shared/errors/AppError';

// fakes
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeCarsImagesRepository } from '@modules/cars/repositories/fakes/FakeCarsImagesRepository';
import { FakeStorageProvider } from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

// useCase
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

// inicialize
let fakeCarsRepository: FakeCarsRepository;
let fakeCarsImagesRepository: FakeCarsImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let uploadCarImagesUseCase: UploadCarImagesUseCase;

describe('UploadCarImages', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeCarsImagesRepository = new FakeCarsImagesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    uploadCarImagesUseCase = new UploadCarImagesUseCase(
      fakeCarsRepository,
      fakeCarsImagesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a car image', async () => {
    const car = await fakeCarsRepository.create(new CarsBuilder().build());
    const images_name = ['first', 'second', 'third'];

    const carImages = await uploadCarImagesUseCase.execute({
      car_id: car.id,
      images_name,
    });

    expect(carImages).toHaveLength(3);
  });

  it('should not be able to create a non existing car', async () => {
    const images_name = ['first', 'second', 'third'];

    await expect(() =>
      uploadCarImagesUseCase.execute({
        car_id: 'non-existing-car',
        images_name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
