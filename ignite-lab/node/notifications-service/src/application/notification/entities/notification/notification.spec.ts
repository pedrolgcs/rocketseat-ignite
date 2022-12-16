import { Notification } from './notification';
import { Content } from './validate';

describe('[Entity] Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'uuid',
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
    });

    expect(notification).toBeTruthy();
  });
});
