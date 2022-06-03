// database
import { prisma } from '@/shared/infra/database/prismaClient';

class FindAllAvailableUseCase {
  async execute() {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    });

    return deliveries;
  }
}

export { FindAllAvailableUseCase };
