import { v4 as uuid } from 'uuid';

import { Deliveryman } from '@prisma/client';

class DeliverymanBuilder {
  private deliveryman: Deliveryman;

  constructor() {
    this.deliveryman = {
      id: uuid(),
      username: 'some-username',
      password: 'some-password',
    };
  }

  public setUsername(username: string): this {
    this.deliveryman.username = username;
    return this;
  }

  public setPassword(password: string): this {
    this.deliveryman.password = password;
    return this;
  }

  public build(): Deliveryman {
    return this.deliveryman;
  }
}

export { DeliverymanBuilder };
