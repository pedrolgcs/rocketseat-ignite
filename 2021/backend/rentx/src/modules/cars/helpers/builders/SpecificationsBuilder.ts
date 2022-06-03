import { v4 } from 'uuid';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

class SpecificationsBuilder {
  private specification: Specification;

  constructor(id = v4()) {
    this.specification = {
      id,
      name: 'v8',
      description: 'A fast car',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  public setName(name: string): this {
    this.specification.name = name;
    return this;
  }

  public setDescription(description: string): this {
    this.specification.description = description;
    return this;
  }

  public build(): Specification {
    return this.specification;
  }
}

export { SpecificationsBuilder };
