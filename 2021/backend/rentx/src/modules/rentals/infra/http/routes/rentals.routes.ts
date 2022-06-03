import { Router } from 'express';

// middleware
import { auth } from '@shared/infra/http/middlewares/auth';

// controllers
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/listRentalsByUserController';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

// initialize
const listRentalsByUserController = new ListRentalsByUserController();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

const rentalsRouter = Router();

rentalsRouter.use(auth);
rentalsRouter.get('/', listRentalsByUserController.handle);
rentalsRouter.post('/', createRentalController.handle);
rentalsRouter.put('/devolution/:id', devolutionRentalController.handle);

export { rentalsRouter };
