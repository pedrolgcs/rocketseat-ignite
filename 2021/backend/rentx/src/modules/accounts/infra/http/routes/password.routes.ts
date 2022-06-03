import { Router } from 'express';

// controllers
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sessions/sendForgotPasswordMail/SendForgotPasswordMailController';
import { ResetPasswordController } from '@modules/accounts/useCases/sessions/resetPassword/ResetPasswordController';

// inicialize
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

const passwordRouter = Router();

passwordRouter.post('/forgot', sendForgotPasswordMailController.handle);
passwordRouter.patch('/reset', resetPasswordController.handle);

export { passwordRouter };
