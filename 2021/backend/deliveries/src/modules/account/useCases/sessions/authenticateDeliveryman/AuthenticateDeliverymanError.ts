import { AppError } from '@/shared/errors/AppError';

export namespace AuthenticateDeliverymanError {
  export class DeliverymanDoesNotExists extends AppError {
    constructor() {
      super('Deliveryman does not exists', 400);
    }
  }

  export class InvalidPassword extends AppError {
    constructor() {
      super('Invalid password', 400);
    }
  }
}
