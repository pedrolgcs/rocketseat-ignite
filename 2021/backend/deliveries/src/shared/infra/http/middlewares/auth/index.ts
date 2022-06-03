import { Request, Response, NextFunction } from 'express';

// middlewares
import { EnsureAuthenticated } from './EnsureAuthenticated';
import { EnsureClient } from './EnsureClient';
import { EnsureDileveryman } from './EnsureDileveryman';

function auth(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const ensureAuthenticated = new EnsureAuthenticated();
  return ensureAuthenticated.handle(request, response, next);
}

function isClient(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const ensureClient = new EnsureClient();
  return ensureClient.handle(request, response, next);
}

function isDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const ensureDeliveryman = new EnsureDileveryman();
  return ensureDeliveryman.handle(request, response, next);
}

export { auth, isClient, isDeliveryman };
