import { Notification } from '@/application/notification/entities/notification';
import { NotificationsRepository } from '@/application/notification/repositories/notifications-repository';

class InMemoryNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[];

  constructor() {
    this.notifications = [];
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}

export { InMemoryNotificationsRepository };
