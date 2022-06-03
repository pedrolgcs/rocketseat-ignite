// entities
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

// dtos
import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  save(rental: Rental): Promise<Rental>;
  listByUser(user_id: string): Promise<Rental[]>;
  findById(id: string): Promise<Rental | undefined>;
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
}

export { IRentalsRepository };
