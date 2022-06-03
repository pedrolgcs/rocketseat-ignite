import { v4 } from 'uuid';

import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

class CategoriesBuilder {
  private category: Category;

  constructor(id = v4()) {
    this.category = {
      id,
      name: 'SUV',
      description: 'SUV is a big car',
      cars: [],
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  public setName(name: string): this {
    this.category.name = name;
    return this;
  }

  public setDescription(description: string): this {
    this.category.description = description;
    return this;
  }

  public setCars(cars: Car[]): this {
    cars.forEach(car => this.category.cars.push(car));
    return this;
  }

  public setCreatedAt(date: Date): this {
    this.category.created_at = date;
    return this;
  }

  public setUpdatedAt(date: Date): this {
    this.category.updated_at = date;
    return this;
  }

  public build(): Category {
    return this.category;
  }
}

export { CategoriesBuilder };
