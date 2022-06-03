import { IHashUser } from '../models/IHashUser';

class FakeHashUser implements IHashUser {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export { FakeHashUser };
