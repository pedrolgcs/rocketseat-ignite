import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/application/notification/repositories/notifications-repository';
import { NotificationNotFound } from './errors';

interface Request {
  notificationId: string;
}

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: Request): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
