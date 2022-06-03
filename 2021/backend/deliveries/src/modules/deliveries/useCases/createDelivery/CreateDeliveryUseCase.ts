// database
import { prisma } from '@/shared/infra/database/prismaClient';

// type
import { ICreateDeliveryDTO } from './ICreateDeliveryDTO';

class CreateDeliveryUseCase {
  async execute({ item_name, id_client }: ICreateDeliveryDTO) {
    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        id_client,
      },
    });

    return delivery;
  }
}

export { CreateDeliveryUseCase };
