import { AppError } from '@/shared/errors/AppError';

export namespace UpdateDeliverymanError {
  export class DeliveryNotExists extends AppError {
    constructor() {
      super('Delivery not exists', 400);
    }
  }
  export class DeliveryAlreadyHasDeliveryman extends AppError {
    constructor() {
      super('Delivery already has deliveryman', 400);
    }
  }
}
