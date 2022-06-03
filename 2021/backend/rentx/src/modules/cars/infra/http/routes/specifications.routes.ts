import { Router } from 'express';

// middleware
import { auth, isAdmin } from '@shared/infra/http/middlewares/auth';

// controllers/
import { ListSpecificationsController } from '@modules/cars/useCases/specifications/ListSpecifications/ListSpecificationsController';
import { CreateSpecificationController } from '@modules/cars/useCases/specifications/CreateSpecification/CreateSpecificationController';

// initialize
const listSpecificationsController = new ListSpecificationsController();
const createSpecificationController = new CreateSpecificationController();

const specificationsRouter = Router();

specificationsRouter.use(auth);
specificationsRouter.get('/', listSpecificationsController.handle);

specificationsRouter.use(isAdmin);
specificationsRouter.post('/', createSpecificationController.handle);

export { specificationsRouter };
