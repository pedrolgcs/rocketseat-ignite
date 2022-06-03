import { v4 } from 'uuid';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

class CarsImagesBuilder {
  private carImage: CarImage;

  constructor(id = v4()) {
    this.carImage = {
      id,
      image_name: 'Image name',
      getImageUrl: () => 'image_url',
      car_id: 'card_id',
      car: new Car(),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  public setName(image_name: string): this {
    this.carImage.image_name = image_name;
    return this;
  }

  public setCarId(car_id: string): this {
    this.carImage.car_id = car_id;
    return this;
  }

  public setCreatedAt(date: Date): this {
    this.carImage.created_at = date;
    return this;
  }

  public setUpdatedAt(date: Date): this {
    this.carImage.updated_at = date;
    return this;
  }

  public build(): CarImage {
    return this.carImage;
  }
}

export { CarsImagesBuilder };
