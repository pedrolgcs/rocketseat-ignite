// database
import { prisma } from '@/shared/infra/database/prismaClient';

// types
import { FindAllCurrentDeliveriesDTO } from './FindAllCurrentDeliveriesDTO';

class FindAllCurrentDeliveriesUseCase {
  async execute({ id_deliveryman, query }: FindAllCurrentDeliveriesDTO) {
    const [total, deliveryman] = await prisma.$transaction([
      prisma.deliveries.count({
        where: {
          id_deliveryman,
          end_at: null,
        },
      }),

      prisma.deliveryman.findFirst({
        where: {
          id: id_deliveryman,
        },
        select: {
          deliveries: {
            skip: query.page * query.perPage,
            take: query.perPage,
            where: {
              end_at: null,
            },
            orderBy: {
              created_at: query.orderBy,
            },
          },
        },
      }),
    ]);

    const response = {
      page: query.page,
      perPane: query.perPage,
      total,
      deliveries: deliveryman?.deliveries,
    };

    return response;
  }
}

export { FindAllCurrentDeliveriesUseCase };
