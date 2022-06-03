import { Router } from 'express';

// accounts
import { sessionsRouter } from '@/modules/account/infra/http/routes';

// clients
import { clientsRouter } from '@/modules/clients/infra/http/routes';

// deliveryman
import { deliverymanRouter } from '@/modules/deliveryman/infra/http/routes';

// deliveries
import { deliveriesRouter } from '@/modules/deliveries/infra/http/routes';

const routes = Router();

routes.get('/', (_, response) => {
  return response.json({ message: 'Hello World' });
});

routes.use('/accounts/sessions', sessionsRouter);

routes.use('/clients', clientsRouter);

routes.use('/deliveryman', deliverymanRouter);

routes.use('/deliveries', deliveriesRouter);

export { routes };
