import { AppError } from '@/shared/errors/AppError';

export namespace CreateClientError {
  export class UsernameAlreadyExists extends AppError {
    constructor() {
      super('Username already used', 400);
    }
  }
}
