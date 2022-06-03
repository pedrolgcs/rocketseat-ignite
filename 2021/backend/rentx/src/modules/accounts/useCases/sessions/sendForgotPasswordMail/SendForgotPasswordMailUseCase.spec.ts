import { AppError } from '@shared/errors/AppError';

// fakes
import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository';
import { FakeUsersTokensRepository } from '@modules/accounts/repositories/fakes/FakeUsersTokensRepository';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

// providers
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';

// helpers
import { UsersBuilder } from '@modules/accounts/helpers/builders/UsersBuilder';

// services
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeMailProvider: FakeMailProvider;
let dayJsDateProvider: DayJsDateProvider;

let sendForgotPasswordMail: SendForgotPasswordMailUseCase;

describe('SendForgotPasswordMail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    dayJsDateProvider = new DayJsDateProvider();
    fakeMailProvider = new FakeMailProvider();
    sendForgotPasswordMail = new SendForgotPasswordMailUseCase(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      dayJsDateProvider,
      fakeMailProvider,
    );
  });

  it('should be able to send a e-mail', async () => {
    const sendMail = spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUsersRepository.create(
      new UsersBuilder().setEmail('pedro@gmail.com').build(),
    );

    await sendForgotPasswordMail.execute({ email: user.email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send a e-mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMail.execute({ email: 'non-existing@gmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a users token', async () => {
    const generateToken = spyOn(fakeUsersTokensRepository, 'create');

    const user = await fakeUsersRepository.create(
      new UsersBuilder().setEmail('pedro@gmail.com').build(),
    );

    await sendForgotPasswordMail.execute({ email: user.email });

    expect(generateToken).toBeCalled();
  });
});
