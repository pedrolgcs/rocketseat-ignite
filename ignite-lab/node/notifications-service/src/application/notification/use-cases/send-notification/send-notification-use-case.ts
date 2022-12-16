import {
  Notification,
  Content,
} from '@/application/notification/entities/notification';
import { NotificationsRepository } from '@/application/notification/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface Request {
  recipientId: string;
  content: string;
  category: string;
}

interface Response {
  notification: Notification;
}

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
