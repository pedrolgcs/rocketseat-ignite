import redis from 'redis';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

// erros
import { AppError } from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_HOST),
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 5,
  duration: 5,
});

async function rateLimiter(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw new AppError('to many requests', 429);
  }
}

export { rateLimiter };
