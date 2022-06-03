import { addDays } from 'date-fns';

// database
import { prisma } from '@/shared/infra/database/prismaClient';

// types
import { FindAllFinishedDeliveriesDTO } from './FindAllFinishedDeliveriesDTO';

class FindAllFinishedDeliveries {
  async execute({ id_deliveryman, query }: FindAllFinishedDeliveriesDTO) {
    const [total, deliveries] = await prisma.$transaction([
      prisma.deliveries.count({
        where: {
          id_deliveryman,
          end_at: query.endAt
            ? {
                gte: query.endAt,
                lt: addDays(query.endAt, 1),
              }
            : { not: null },
        },
      }),

      prisma.deliveries.findMany({
        skip: query.page * query.perPage,
        take: query.perPage,
        where: {
          id_deliveryman,
          end_at: query.endAt
            ? {
                gte: query.endAt,
                lt: addDays(query.endAt, 1),
              }
            : { not: null },
        },
        orderBy: {
          end_at: query.orderBy,
        },
      }),
    ]);

    const response = {
      page: query.page,
      perPane: query.perPage,
      total,
      deliveries,
    };

    return response;
  }
}

export { FindAllFinishedDeliveries };
