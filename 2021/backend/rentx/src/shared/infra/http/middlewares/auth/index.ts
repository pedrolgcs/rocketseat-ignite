import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

// middlewares
import { EnsureAuthenticated } from './EnsureAuthenticated';
import { EnsureAdmin } from './EnsureAdmin';

function auth(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const ensureAuthenticated = container.resolve(EnsureAuthenticated);
  return ensureAuthenticated.handle(request, response, next);
}

function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const ensureAdmin = container.resolve(EnsureAdmin);
  return ensureAdmin.handle(request, response, next);
}

export { auth, isAdmin };
