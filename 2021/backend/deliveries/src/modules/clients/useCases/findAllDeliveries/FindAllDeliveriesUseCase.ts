// database
import { prisma } from '@/shared/infra/database/prismaClient';

// types
import { FindAllDeliveriesDTO } from './FindAllDeliveriesDTO';

class FindAllDeliveriesUseCase {
  async execute({ id_client }: FindAllDeliveriesDTO) {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        id_client,
      },
      orderBy: {
        end_at: 'desc',
      }
    });

    return deliveries;
  }
}

export { FindAllDeliveriesUseCase };
