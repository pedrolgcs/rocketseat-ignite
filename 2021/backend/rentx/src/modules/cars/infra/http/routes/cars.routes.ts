import { Router } from 'express';
import multer from 'multer';

// configs
import uploadConfig from '@config/upload';

// middleware
import { auth, isAdmin } from '@shared/infra/http/middlewares/auth';

// controllers
import { CreateCarController } from '@modules/cars/useCases/cars/CreateCar/CreateCarController';
import { ShowCarController } from '@modules/cars/useCases/cars/ShowCar/ShowCarController';
import { ListAvailableCarController } from '@modules/cars/useCases/cars/ListAvailableCars/ListAvailableCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/cars/CreateCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from '@modules/cars/useCases/cars/UploadCarImages/UploadCarImagesController';
import { DeleteCarImagesController } from '@modules/cars/useCases/cars/DeleteCarImages/DeleteCarImagesController';

// initialize
const createCarController = new CreateCarController();
const showCarController = new ShowCarController();
const listAvailableCarController = new ListAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
const deleteCarImagesController = new DeleteCarImagesController();
const upload = multer(uploadConfig.multer.upload());

const carsRouter = Router();

carsRouter.get('/available', listAvailableCarController.handle);
carsRouter.get('/:id', showCarController.handle);

carsRouter.use(auth);

carsRouter.use(isAdmin);
carsRouter.post('/', createCarController.handle);

// specifications
carsRouter.post('/specifications/:id', createCarSpecificationController.handle);

// images
carsRouter.post(
  '/images/:id',
  upload.array('images'),
  uploadCarImagesController.handle,
);
carsRouter.delete('/images/:id', deleteCarImagesController.handle);

export { carsRouter };
