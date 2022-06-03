// database
import { prisma } from '@/shared/infra/database/prismaClient';

// error
import { UpdateDeliverymanError } from './UpdateDeliverymanError';

// types
import { UpdateDeliverymanDTO } from './UpdateDeliverymanDTO';

class UpdateDeliverymanUseCase {
  async execute({ id_deliveryman, id_delivery }: UpdateDeliverymanDTO) {
    const delivery = await prisma.deliveries.findFirst({
      where: { id: id_delivery },
    });

    if (!delivery) {
      throw new UpdateDeliverymanError.DeliveryNotExists();
    }

    if (
      delivery.id_deliveryman !== null &&
      delivery.id_deliveryman !== id_deliveryman
    ) {
      throw new UpdateDeliverymanError.DeliveryAlreadyHasDeliveryman();
    }

    const deliveryUpdated = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    });

    return deliveryUpdated;
  }
}

export { UpdateDeliverymanUseCase };
