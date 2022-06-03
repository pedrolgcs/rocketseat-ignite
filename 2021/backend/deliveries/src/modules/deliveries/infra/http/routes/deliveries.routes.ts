import { Router } from 'express';

// middlewares
import {
  auth,
  isClient,
  isDeliveryman,
} from '@/shared/infra/http/middlewares/auth';

// controllers
import { CreateDeliveryController } from '@/modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from '@/modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { UpdateDeliverymanController } from '@/modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController';
import { FinishDeliveryController } from '@/modules/deliveries/useCases/finishDelivery/FinishDeliveryController';

// inicialize
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const finishDeliveryController = new FinishDeliveryController();
const deliveriesRouter = Router();

deliveriesRouter.use(auth);

// routes
deliveriesRouter.post('/', isClient, createDeliveryController.handle);

deliveriesRouter.get(
  '/available',
  isDeliveryman,
  findAllAvailableController.handle
);

deliveriesRouter.put(
  '/:id/deliveryman',
  isDeliveryman,
  updateDeliverymanController.handle
);

deliveriesRouter.put(
  '/:id/finish',
  isDeliveryman,
  finishDeliveryController.handle
)

export { deliveriesRouter };
