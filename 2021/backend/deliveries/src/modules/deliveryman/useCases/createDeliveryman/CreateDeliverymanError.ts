import { AppError } from '@/shared/errors/AppError';

export namespace CreateDeliverymanError {
  export class UsernameAlreadyExists extends AppError {
    constructor() {
      super('Username already used', 400);
    }
  }
}
