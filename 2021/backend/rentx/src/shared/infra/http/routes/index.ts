import { Router } from 'express';

// Accounts
import {
  usersRouter,
  sessionsRouter,
  passwordRouter,
} from '@modules/accounts/infra/http/routes';

// Cars
import {
  carsRouter,
  categoriesRouter,
  specificationsRouter,
} from '@modules/cars/infra/http/routes';

// Rentals
import { rentalsRouter } from '@modules/rentals/infra/http/routes';

const routes = Router();

routes.use('/accounts/users', usersRouter);
routes.use('/accounts/sessions', sessionsRouter);
routes.use('/accounts/password', passwordRouter);

routes.use('/cars', carsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/specifications', specificationsRouter);

routes.use('/rentals', rentalsRouter);

export { routes };
