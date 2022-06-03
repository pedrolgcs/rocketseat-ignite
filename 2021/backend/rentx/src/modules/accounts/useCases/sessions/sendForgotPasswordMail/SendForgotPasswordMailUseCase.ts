import path from 'path';
import { injectable, inject } from 'tsyringe';
import { v4 } from 'uuid';

// error handling
import { AppError } from '@shared/errors/AppError';

// interfaces
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists', 400);
    }

    const token = v4();

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date: this.dateProvider.addHours(3),
    });

    const templatePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    const variables = {
      name: user.name,
      link: `${process.env.APP_URL}/password/reset?token=${token}`,
    };

    await this.mailProvider.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      path: templatePath,
      variables,
    });
  }
}

export { SendForgotPasswordMailUseCase };
