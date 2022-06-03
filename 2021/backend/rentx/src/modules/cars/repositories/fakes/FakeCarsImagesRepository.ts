import { v4 } from 'uuid';

// entities
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

// dtos
import { ICreateCarImagesDTO } from '@modules/cars/dtos/ICreateCarImagesDTO';

// repository
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

class FakeCarsImagesRepository implements ICarsImagesRepository {
  private carImages: CarImage[] = [];

  public async create(data: ICreateCarImagesDTO): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, { id: v4() }, data);

    this.carImages.push(carImage);

    return carImage;
  }

  public async findById(id: string): Promise<CarImage | undefined> {
    return this.carImages.find(carImage => carImage.id === id);
  }

  public async delete(id: string): Promise<void> {
    this.carImages.filter(image => image.id !== id);
  }
}

export { FakeCarsImagesRepository };
