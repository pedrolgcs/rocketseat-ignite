// database
import { prisma } from '@/shared/infra/database/prismaClient';

// types
import { FinishDeliveryDTO } from './FinishDeliveryDTO';

// error
import { FinishDeliveryError } from './FinishDeliveryError';

class FinishDeliveryUseCase {
  async execute({ id_delivery, id_deliveryman }: FinishDeliveryDTO) {
    const delivery = await prisma.deliveries.findFirst({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
    });

    if (!delivery) {
      throw new FinishDeliveryError.DeliveryDoesNotBelongToDeliveryman();
    }

    const response = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        end_at: new Date(),
      },
    });

    return response;
  }
}

export { FinishDeliveryUseCase };
