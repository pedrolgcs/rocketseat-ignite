import { SendNotificationUseCase } from './send-notification-use-case';
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';

// inicialize
let notificationsRepository: InMemoryNotificationsRepository;

describe('[UseCase] SendNotification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
  });

  it('should be able to send a notification', async () => {
    const sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
    );

    const { notification } = await sendNotificationUseCase.execute({
      recipientId: 'uuid',
      category: 'social',
      content: 'This is a notification',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
