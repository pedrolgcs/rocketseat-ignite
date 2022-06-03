import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

// interfaces
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class EnsureAdmin {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async handle(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> {
    const { id } = request.user;

    const user = await this.usersRepository.findById(id);

    if (!user.is_admin) {
      throw new AppError("User is isn't not admin");
    }

    return next();
  }
}

export { EnsureAdmin };
