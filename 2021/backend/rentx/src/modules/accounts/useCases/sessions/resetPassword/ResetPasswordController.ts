import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPassword = container.resolve(ResetPasswordUseCase);

    await resetPassword.execute({ token: String(token), password });

    return response.status(201).send();
  }
}

export { ResetPasswordController };
