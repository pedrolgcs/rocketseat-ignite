import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

// error
import { AppError } from '@/shared/errors/AppError';

// config
import authConfig from '@/config/auth';

type ITokenPayload = JwtPayload & {
  username: string;
  sub: string;
};

class EnsureAuthenticated {
  public async handle(
    request: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JTW token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret) as ITokenPayload;

      const { sub: user_id } = decoded;

      request.user = {
        id: user_id,
      };

      return next();
    } catch {
      throw new AppError('Invalid JWT token', 401);
    }
  }
}

export { EnsureAuthenticated };
