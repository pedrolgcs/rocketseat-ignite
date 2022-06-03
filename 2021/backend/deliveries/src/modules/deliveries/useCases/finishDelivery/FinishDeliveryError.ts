import { AppError } from '@/shared/errors/AppError';

export namespace FinishDeliveryError {
  export class DeliveryDoesNotBelongToDeliveryman extends AppError {
    constructor() {
      super('Delivery does not belong to deliveryman');
    }
  }
}
