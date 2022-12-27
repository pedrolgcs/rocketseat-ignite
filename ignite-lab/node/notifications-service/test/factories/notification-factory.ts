import {
  Notification,
  NotificationProps,
  Content,
} from '@/application/notification/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'uuid',
    category: 'social',
    content: new Content('Nova solitação de amizade'),
    ...override,
  });
}
