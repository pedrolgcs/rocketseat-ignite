import { NotificationsRepository } from '@/application/notification/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface Request {
  recipientId: string;
}

interface Response {
  count: number;
}

@Injectable()
export class CountRecipientNotificationsUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
