import { v4 } from 'uuid';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

class RentalsBuilder {
  private rental: Rental;

  constructor(id = v4()) {
    this.rental = {
      id,
      car_id: '123',
      car: new Car(),
      user_id: '123',
      start_date: new Date(),
      end_date: null,
      expected_return_date: new Date(),
      total: null,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  public setCarId(car_id: string): this {
    this.rental.car_id = car_id;
    return this;
  }

  public setUserId(user_id: string): this {
    this.rental.user_id = user_id;
    return this;
  }

  public setStartDate(start_date: Date): this {
    this.rental.start_date = start_date;
    return this;
  }

  public setEndDate(end_date: Date): this {
    this.rental.end_date = end_date;
    return this;
  }

  public setExpectedReturnDate(expected_return_date: Date): this {
    this.rental.expected_return_date = expected_return_date;
    return this;
  }

  public setTotal(total: number): this {
    this.rental.total = total;
    return this;
  }

  public builder(): Rental {
    return this.rental;
  }
}

export { RentalsBuilder };
