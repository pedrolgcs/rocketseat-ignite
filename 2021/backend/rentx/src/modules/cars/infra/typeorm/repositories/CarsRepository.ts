import { Repository, getRepository } from 'typeorm';

// interface
import {
  ICarsRepository,
  IFilters,
} from '@modules/cars/repositories/ICarsRepository';

// dtos
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

// entities
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  public async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create(data);

    return this.ormRepository.save(car);
  }

  public async save(car: Car): Promise<Car> {
    return this.ormRepository.save(car);
  }

  public async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Car)
      .set({ available })
      .where('id = :id', { id })
      .execute();
  }

  public async list(): Promise<Car[]> {
    return this.ormRepository.find({
      order: { name: 'ASC' },
      relations: ['category'],
    });
  }

  public async findById(id: string): Promise<Car | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ['category', 'specifications', 'car_images'],
    });
  }

  public async findAvailable({
    name,
    brand,
    category_id,
  }: IFilters): Promise<Car[]> {
    const carsQuery = this.ormRepository
      .createQueryBuilder('cars')
      .leftJoinAndSelect('cars.category', 'category')
      .where('available = :available', { available: true });

    // filters
    if (name) {
      carsQuery.andWhere('cars.name ilike :name', { name: `%${name}%` });
    }

    if (brand) {
      carsQuery.andWhere('cars.brand = :brand', { brand });
    }

    if (category_id) {
      carsQuery.andWhere('cars.category_id = :category_id', { category_id });
    }

    // execute query
    return carsQuery.getMany();
  }

  public async findByLicensePlate(
    license_plate: string,
  ): Promise<Car | undefined> {
    return this.ormRepository.findOne({ where: { license_plate } });
  }
}

export { CarsRepository };
