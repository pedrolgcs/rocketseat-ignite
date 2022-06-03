import { hash, compare } from 'bcryptjs';

import { IHashUser } from '../models/IHashUser';

class BCryptHashUser implements IHashUser {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { BCryptHashUser };
