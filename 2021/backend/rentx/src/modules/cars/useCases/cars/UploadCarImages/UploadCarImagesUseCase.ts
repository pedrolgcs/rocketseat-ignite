import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

// interfaces
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError("Car doesn't exists", 400);
    }

    const carImages = await Promise.all(
      images_name.map(async image => {
        await this.storageProvider.saveFile(image, `cars/${car_id}`);

        return this.carsImagesRepository.create({
          car_id,
          image_name: image,
        });
      }),
    );

    return carImages;
  }
}

export { UploadCarImagesUseCase };
