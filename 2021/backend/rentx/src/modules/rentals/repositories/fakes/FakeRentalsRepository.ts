import { v4 } from 'uuid';

// entities
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

// interfaces
import { IRentalsRepository } from '../IRentalsRepository';

// dtos
import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO';

class FakeRentalsRepository implements IRentalsRepository {
  private rentals: Rental[] = [];

  public async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, { id: v4(), start_date: new Date() }, data);

    this.rentals.push(rental);
    return rental;
  }

  public async save(rental: Rental): Promise<Rental> {
    const findIndex = this.rentals.findIndex(
      element => element.id === rental.id,
    );

    this.rentals[findIndex] = rental;

    return rental;
  }

  public async listByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === user_id);
  }

  public async findById(id: string): Promise<Rental | undefined> {
    return this.rentals.find(rental => rental.id === id);
  }

  public async findOpenRentalByCar(
    car_id: string,
  ): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
  }

  public async findOpenRentalByUser(
    user_id: string,
  ): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
  }
}

export { FakeRentalsRepository };
