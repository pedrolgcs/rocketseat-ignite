import { Notification } from '@/application/notification/entities/notification';
import { ReadNotificationUseCase } from './read-notification-use-case';
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@/test/factories/notification-factory';
import { NotificationNotFound } from './errors';

// inicialize
let notificationsRepository: InMemoryNotificationsRepository;
let readNotificationUseCase: ReadNotificationUseCase;
let fakeNotification: Notification;

describe('[UseCase] ReadNotification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    readNotificationUseCase = new ReadNotificationUseCase(
      notificationsRepository,
    );

    fakeNotification = makeNotification({ recipientId: 'uuid' });

    notificationsRepository.create(fakeNotification);
  });

  it('should be able to read a notification', async () => {
    await readNotificationUseCase.execute({
      notificationId: fakeNotification.id,
    });

    expect(fakeNotification.readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a non existing notification', async () => {
    expect(() => {
      return readNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
