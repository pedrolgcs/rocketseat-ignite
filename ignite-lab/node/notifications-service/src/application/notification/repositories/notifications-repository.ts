import { Notification } from '@/application/notification/entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
}
