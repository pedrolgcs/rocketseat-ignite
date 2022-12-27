import { Notification } from '@/application/notification/entities/notification';
import { CancelNotificationUseCase } from './cancel-notification-use-case';
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@/test/factories/notification-factory';
import { NotificationNotFound } from './errors';

// inicialize
let notificationsRepository: InMemoryNotificationsRepository;
let cancelNotificationUseCase: CancelNotificationUseCase;
let fakeNotification: Notification;

describe('[UseCase] CancelNotification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );

    fakeNotification = makeNotification({ recipientId: 'uuid' });

    notificationsRepository.create(fakeNotification);
  });

  it('should be able to cancel a notification', async () => {
    await cancelNotificationUseCase.execute({
      notificationId: fakeNotification.id,
    });

    expect(fakeNotification.canceledAt).toEqual(expect.any(Date));
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    expect(() => {
      return cancelNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
