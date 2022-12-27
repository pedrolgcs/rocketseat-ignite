import { Notification } from '@/application/notification/entities/notification';
import { NotificationsRepository } from '@/application/notification/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface Request {
  recipientId: string;
}

interface Response {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
