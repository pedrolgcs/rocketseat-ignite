import { Router } from 'express';

// middlewares
import { auth, isDeliveryman } from '@/shared/infra/http/middlewares/auth';

// controllers
import { CreateDeliverymanController } from '@/modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { FindAllCurrentDeliveriesController } from '@/modules/deliveryman/useCases/findAllCurrentDeliveries/FindAllCurrentDeliveriesController';
import { FindAllFinishedDeliveriesController } from '@/modules/deliveryman/useCases/findAllFinishedDeliveries/FindAllFinishedDeliveriesController';

// inicialize
const createDeliverymanController = new CreateDeliverymanController();
const findAllCurrentDeliveriesController =
  new FindAllCurrentDeliveriesController();
const findAllFinishedDeliveriesController =
  new FindAllFinishedDeliveriesController();
const deliverymanRouter = Router();

/* Public */
deliverymanRouter.post('/', createDeliverymanController.handle);

/* Auth */
deliverymanRouter.use(auth);

deliverymanRouter.get(
  '/deliveries/current',
  isDeliveryman,
  findAllCurrentDeliveriesController.handle
);

deliverymanRouter.get(
  '/deliveries/finished',
  isDeliveryman,
  findAllFinishedDeliveriesController.handle
);

export { deliverymanRouter };
