import { v4 } from 'uuid';

import { User } from '@modules/accounts/infra/typeorm/entities/User';

class UsersBuilder {
  private user: User;

  constructor(id = v4()) {
    this.user = {
      id,
      name: 'User',
      email: 'user@gmail.com',
      driver_license: '123',
      password: '123',
      is_admin: false,
      avatar: 'user.png',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  public setName(name: string): this {
    this.user.name = name;
    return this;
  }

  public setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  public setPassword(password: string): this {
    this.user.password = password;
    return this;
  }

  public setIsAdmin(status: boolean): this {
    this.user.is_admin = status;
    return this;
  }

  public setCreatedAt(date: Date): this {
    this.user.created_at = date;
    return this;
  }

  public setAvatar(name: string): this {
    this.user.avatar = name;
    return this;
  }

  public setUpdatedAt(date: Date): this {
    this.user.updated_at = date;
    return this;
  }

  public build(): User {
    return this.user;
  }
}

export { UsersBuilder };
