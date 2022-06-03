import { Router } from 'express';
import multer from 'multer';

// configs
import uploadConfig from '@config/upload';

// middleware
import { auth, isAdmin } from '@shared/infra/http/middlewares/auth';

// controllers
import { ListCategoriesController } from '@modules/cars/useCases/categories/ListCategories/ListCategoriesController';
import { CreateCategoryController } from '@modules/cars/useCases/categories/CreateCategory/CreateCategoryController';
import { ImportCategoriesController } from '@modules/cars/useCases/categories/ImportCategories/ImportCategoriesController';

// initialize
const listCategoriesController = new ListCategoriesController();
const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const upload = multer(uploadConfig.multer.upload());

const categoriesRouter = Router();

categoriesRouter.use(auth);
categoriesRouter.get('/', listCategoriesController.handle);

categoriesRouter.use(isAdmin);
categoriesRouter.post('/', createCategoryController.handle);
categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle,
);

export { categoriesRouter };
