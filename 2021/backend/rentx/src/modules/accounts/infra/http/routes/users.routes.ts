import { Router } from 'express';
import multer from 'multer';

// configs
import uploadConfig from '@config/upload';

// middleware
import { auth } from '@shared/infra/http/middlewares/auth';

// controllers
import { CreateUserController } from '@modules/accounts/useCases/users/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/users/updateUserAvatar/UpdateUserAvatarController';
import { ShowProfileController } from '@modules/accounts/useCases/users/showProfile/ShowProfileController';

// inicialize
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const showProfileController = new ShowProfileController();
const upload = multer(uploadConfig.multer.upload());

const usersRouter = Router();

// Public
usersRouter.post('/', createUserController.handle);

// Private require Auth
usersRouter.use(auth);
usersRouter.get('/profile', showProfileController.handle);
usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

export { usersRouter };
