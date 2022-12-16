import { Notification } from '@/application/notification/entities/notification';
import { NotificationsRepository } from '@/application/notification/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        recipientId: notification.recipientId,
        content: notification.content.value,
        category: notification.category,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
      },
    });
  }
}

export { PrismaNotificationsRepository };
