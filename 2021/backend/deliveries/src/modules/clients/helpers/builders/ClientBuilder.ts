import { v4 as uuid } from 'uuid';

import { Clients } from '@prisma/client';

class ClientBuilder {
  private client: Clients;

  constructor() {
    this.client = {
      id: uuid(),
      username: 'some-username',
      password: 'some-password',
    };
  }

  public setUsername(username: string): this {
    this.client.username = username;
    return this;
  }

  public setPassword(password: string): this {
    this.client.password = password;
    return this;
  }

  public build(): Clients {
    return this.client;
  }
}

export { ClientBuilder };
