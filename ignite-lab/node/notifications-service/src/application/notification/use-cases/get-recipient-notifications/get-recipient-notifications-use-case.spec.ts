import { GetRecipientNotificationsUseCase } from './get-recipient-notifications-use-case';
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@/test/factories/notification-factory';

// inicialize
let notificationsRepository: InMemoryNotificationsRepository;
let getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase;

describe('[UseCase] CountRecipientNotifications', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    getRecipientNotificationsUseCase = new GetRecipientNotificationsUseCase(
      notificationsRepository,
    );
  });

  it('should be able to get recipient notifications', async () => {
    const expected = 2;

    notificationsRepository.create(makeNotification({ recipientId: 'uuid' }));
    notificationsRepository.create(makeNotification({ recipientId: 'uuid' }));

    notificationsRepository.create(
      makeNotification({ recipientId: 'another-uuid' }),
    );

    const sut = await getRecipientNotificationsUseCase.execute({
      recipientId: 'uuid',
    });

    expect(sut.notifications).toHaveLength(expected);
    expect(sut.notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'uuid' }),
        expect.objectContaining({ recipientId: 'uuid' }),
      ]),
    );
  });
});
