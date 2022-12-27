import {
  Content,
  Notification,
} from '@/application/notification/entities/notification';
import { CountRecipientNotificationsUseCase } from './count-recipient-notifications-use-case';
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@/test/factories/notification-factory';

// inicialize
let notificationsRepository: InMemoryNotificationsRepository;
let countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase;
let fakeNotification: Notification;

describe('[UseCase] CountRecipientNotifications', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    countRecipientNotificationsUseCase = new CountRecipientNotificationsUseCase(
      notificationsRepository,
    );

    fakeNotification = makeNotification({ recipientId: 'uuid' });
    notificationsRepository.create(makeNotification({ recipientId: 'uuid' }));

    notificationsRepository.create(fakeNotification);
  });

  it('should be able to count recipient notifications', async () => {
    const expected = {
      count: 2,
    };

    notificationsRepository.create(
      makeNotification({ recipientId: 'another-uuid' }),
    );

    const sut = await countRecipientNotificationsUseCase.execute({
      recipientId: fakeNotification.recipientId,
    });

    expect(sut).toStrictEqual(expected);
  });
});
