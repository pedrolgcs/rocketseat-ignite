import { Notification } from '@/application/notification/entities/notification';
import { UnreadNotificationUseCase } from './unread-notification-use-case';
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@/test/factories/notification-factory';
import { NotificationNotFound } from './errors';

// inicialize
let notificationsRepository: InMemoryNotificationsRepository;
let unreadNotificationUseCase: UnreadNotificationUseCase;
let fakeNotification: Notification;

describe('[UseCase] UnreadNotification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    fakeNotification = makeNotification({
      recipientId: 'uuid',
      readAt: new Date(),
    });

    notificationsRepository.create(fakeNotification);
  });

  it('should be able to unread a notification', async () => {
    await unreadNotificationUseCase.execute({
      notificationId: fakeNotification.id,
    });

    expect(fakeNotification.readAt).toBe(null);
  });

  it('should not be able to unread a non existing notification', async () => {
    expect(() => {
      return unreadNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
