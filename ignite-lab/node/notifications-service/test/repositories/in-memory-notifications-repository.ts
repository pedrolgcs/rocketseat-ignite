import { Notification } from '@/application/notification/entities/notification';
import { NotificationsRepository } from '@/application/notification/repositories/notifications-repository';

class InMemoryNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[];

  constructor() {
    this.notifications = [];
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.notifications.find((item) => item.id === id);

    if (!notification) {
      return null;
    }

    return notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );

    return notifications;
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const notifications = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );

    return notifications.length;
  }
}

export { InMemoryNotificationsRepository };
