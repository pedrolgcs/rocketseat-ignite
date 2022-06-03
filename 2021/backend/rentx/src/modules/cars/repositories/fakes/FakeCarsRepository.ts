import { v4 } from 'uuid';

// entities
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

// dtos
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

// repository
import {
  ICarsRepository,
  IFilters,
} from '@modules/cars/repositories/ICarsRepository';

class FakeCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  public async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, { id: v4() }, data);

    this.cars.push(car);
    return car;
  }

  public async save(car: Car): Promise<Car> {
    const findIndex = this.cars.findIndex(findCar => findCar.id === car.id);
    this.cars[findIndex] = car;
    return car;
  }

  public async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex(findCar => findCar.id === id);

    this.cars[carIndex].available = available;
  }

  public async list(): Promise<Car[]> {
    return this.cars;
  }

  public async findById(id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === id);
  }

  public async findAvailable({
    name,
    brand,
    category_id,
  }: IFilters): Promise<Car[]> {
    return this.cars.filter(
      car =>
        car.available === true &&
        (brand ? car.brand === brand : true) &&
        (name ? car.name === name : true) &&
        (category_id ? car.category_id === category_id : true),
    );
  }

  public async findByLicensePlate(
    license_plate: string,
  ): Promise<Car | undefined> {
    return this.cars.find(car => car.license_plate === license_plate);
  }
}

export { FakeCarsRepository };
