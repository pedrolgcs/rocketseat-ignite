import { Request, Response, NextFunction } from 'express';

// database
import { prisma } from '@/shared/infra/database/prismaClient';

// error
import { AppError } from '@/shared/errors/AppError';

class EnsureDileveryman {
  public async handle(
    request: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = request.user;

    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        id,
      },
    });

    if (!deliveryman) {
      throw new AppError('Deliveryman not found', 401);
    }

    return next();
  }
}

export { EnsureDileveryman };
