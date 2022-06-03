import { Request, Response, NextFunction } from 'express';

// database
import { prisma } from '@/shared/infra/database/prismaClient';

// error
import { AppError } from '@/shared/errors/AppError';

class EnsureClient {
  public async handle(
    request: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = request.user;

    const client = await prisma.clients.findFirst({
      where: {
        id,
      },
    });

    if (!client) {
      throw new AppError('Client not found', 401);
    }

    return next();
  }
}

export { EnsureClient };
