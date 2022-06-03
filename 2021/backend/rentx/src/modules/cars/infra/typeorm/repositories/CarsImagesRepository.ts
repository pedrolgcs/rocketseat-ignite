import { Repository, getRepository } from 'typeorm';

// interface
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

// dtos
import { ICreateCarImagesDTO } from '@modules/cars/dtos/ICreateCarImagesDTO';

// entities
import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  private ormRepository: Repository<CarImage>;

  constructor() {
    this.ormRepository = getRepository(CarImage);
  }

  public async create(data: ICreateCarImagesDTO): Promise<CarImage> {
    const carImage = this.ormRepository.create(data);

    await this.ormRepository.save(carImage);

    return carImage;
  }

  public async findById(id: string): Promise<CarImage | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { CarsImagesRepository };
