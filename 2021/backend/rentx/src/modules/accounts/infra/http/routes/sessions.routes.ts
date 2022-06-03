import { Router } from 'express';

// controllers
import { AuthenticateUserController } from '@modules/accounts/useCases/sessions/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/sessions/refreshToken/RefreshTokenController';

// inicialize
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

const sessionsRouter = Router();

sessionsRouter.post('/auth', authenticateUserController.handle);
sessionsRouter.post('/refresh-token', refreshTokenController.handle);

export { sessionsRouter };
