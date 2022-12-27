import { Notification as RawNotification } from '@prisma/client';
import {
  Notification,
  Content,
} from '@/application/notification/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification({
      id: raw.id,
      recipientId: raw.recipientId,
      category: raw.category,
      content: new Content(raw.content),
      canceledAt: raw.canceledAt,
      readAt: raw.readAt,
      createdAt: raw.createdAt,
    });
  }
}
