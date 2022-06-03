import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordMail = container.resolve(
      SendForgotPasswordMailUseCase,
    );

    await sendForgotPasswordMail.execute({
      email,
    });

    return response.status(200).send();
  }
}

export { SendForgotPasswordMailController };
