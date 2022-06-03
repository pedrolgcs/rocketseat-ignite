import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import express, { json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

// middlewares

// configs
import uploadConfig from '@config/upload';

// erros
import { AppError } from '@shared/errors/AppError';
import { rateLimiter } from './middlewares/Request';

// routes
import { routes } from './routes';

// docs
import swaggerFile from './swagger.json';

// database connection
import { createDatabaseConnection } from '../typeorm';

// providers
import '@shared/container';

// create express application
const app = express();

// database inicialize
createDatabaseConnection();

// swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile, {}));

// middleware
app.use(json());
app.use(cors());
app.use(rateLimiter);

// routes
app.use(routes);

// static folder
app.use('/files', express.static(uploadConfig.tmpFolder));

/* error middleware */
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
