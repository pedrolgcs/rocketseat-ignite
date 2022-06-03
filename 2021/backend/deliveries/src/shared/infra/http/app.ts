import 'dotenv/config';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import { AppError } from '@/shared/errors/AppError';
import { routes } from './routes';

const app = express();

// middlewares
app.use(express.json());

// routes
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server Error - ${err.message}`,
  });
});

export { app };
