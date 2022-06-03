import { Router } from 'express';

// middlewares
import { auth, isClient } from '@/shared/infra/http/middlewares/auth';

// controllers
import { CreateClientController } from '@/modules/clients/useCases/createClient/CreateClientController';
import { FindAllDeliveriesController } from '@/modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController';

// inicialize
const createClientController = new CreateClientController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const clientsRouter = Router();

/* Public */
clientsRouter.post('/', createClientController.handle);

/* Auth */
clientsRouter.use(auth);
clientsRouter.get('/deliveries', isClient, findAllDeliveriesController.handle);

export { clientsRouter };
