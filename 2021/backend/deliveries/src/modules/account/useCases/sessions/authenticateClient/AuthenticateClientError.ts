import { AppError } from '@/shared/errors/AppError';

export namespace AuthenticateClientError {
  export class ClientDoesNotExists extends AppError {
    constructor() {
      super('Client does not exists', 400);
    }
  }

  export class InvalidPassword extends AppError {
    constructor() {
      super('Invalid password', 400);
    }
  }
}
