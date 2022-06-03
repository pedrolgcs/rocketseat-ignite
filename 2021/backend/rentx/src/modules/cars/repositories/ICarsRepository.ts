import { Car } from '../infra/typeorm/entities/Car';

// dtos
import { ICreateCarDTO } from '../dtos/ICreateCarDTO';

interface IFilters {
  name?: string;
  brand?: string;
  category_id?: string;
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  save(car: Car): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
  list(): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  findAvailable(queries: IFilters): Promise<Car[]>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
}

export { ICarsRepository, IFilters };
