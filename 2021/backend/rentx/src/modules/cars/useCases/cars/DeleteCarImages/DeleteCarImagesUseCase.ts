import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

// interfaces
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  car_id: string;
  car_image_ids: string[];
}

@injectable()
class DeleteCarImagesUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ car_id, car_image_ids }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError("Car doesn't exists", 400);
    }

    car_image_ids.forEach(async carImageId => {
      const carImage = await this.carsImagesRepository.findById(carImageId);

      if (carImage) {
        await this.carsImagesRepository.delete(carImage.id);

        // remove file
        await this.storageProvider.deleteFile(
          `${carImage.image_name}`,
          `cars/${car.id}/`,
        );
      }
    });
  }
}

export { DeleteCarImagesUseCase };
