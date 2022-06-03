import { Router } from 'express';

// controllers
import { AuthenticateClientController } from '@/modules/account/useCases/sessions/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from '@/modules/account/useCases/sessions/authenticateDeliveryman/AuthenticateDeliverymanController';

// inicialize
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

const sessionsRouter = Router();

sessionsRouter.post('/clients/auth', authenticateClientController.handle);
sessionsRouter.post('/deliveryman/auth', authenticateDeliverymanController.handle);

export { sessionsRouter };
