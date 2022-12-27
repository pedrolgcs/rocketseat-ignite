import { SendNotificationUseCase } from './send-notification-use-case';
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';

// inicialize
let notificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

describe('[UseCase] SendNotification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
    );
  });

  it('should be able to send a notification', async () => {
    const sut = await sendNotificationUseCase.execute({
      recipientId: 'uuid',
      category: 'social',
      content: 'This is a notification',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(sut.notification);
  });
});
