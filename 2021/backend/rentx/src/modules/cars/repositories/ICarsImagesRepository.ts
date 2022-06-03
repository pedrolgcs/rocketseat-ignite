import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

// dtos
import { ICreateCarImagesDTO } from '@modules/cars/dtos/ICreateCarImagesDTO';

interface ICarsImagesRepository {
  create(data: ICreateCarImagesDTO): Promise<CarImage>;
  findById(id: string): Promise<CarImage | undefined>;
  delete(id: string): Promise<void>;
}

export { ICarsImagesRepository };
