import { v4 } from 'uuid';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

class CarsBuilder {
  private car: Car;

  constructor(id = v4()) {
    this.car = {
      id,
      name: 'Onix',
      description: 'Populate Car',
      available: true,
      brand: 'Chevrolet',
      daily_rate: 120,
      fine_amount: 200,
      license_plate: 'ABC-1234',
      category_id: '123',
      car_images: [new CarImage()],
      category: new Category(),
      specifications: [new Specification()],
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  public setName(name: string): this {
    this.car.name = name;
    return this;
  }

  public setDescription(description: string): this {
    this.car.description = description;
    return this;
  }

  public setAvailable(available: boolean): this {
    this.car.available = available;
    return this;
  }

  public setDailyRate(daily_rate: number): this {
    this.car.daily_rate = daily_rate;
    return this;
  }

  public setBrand(brand: string): this {
    this.car.brand = brand;
    return this;
  }

  public setFineAmount(fine_amount: number): this {
    this.car.fine_amount = fine_amount;
    return this;
  }

  public setLicensePlate(license_plate: string): this {
    this.car.license_plate = license_plate;
    return this;
  }

  public setCreatedAt(date: Date): this {
    this.car.created_at = date;
    return this;
  }

  public setCategoryId(category_id: string): this {
    this.car.category_id = category_id;
    return this;
  }

  public setUpdatedAt(date: Date): this {
    this.car.updated_at = date;
    return this;
  }

  public build(): Car {
    return this.car;
  }
}

export { CarsBuilder };
