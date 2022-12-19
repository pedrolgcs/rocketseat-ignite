import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationBody } from '@/infra/http/dtos/create-notification-body';
import { SendNotificationUseCase } from '@/application/notification/use-cases/send-notification/send-notification-use-case';

@Controller('notifications')
export class SendNotificationsController {
  constructor(private sendNotification: SendNotificationUseCase) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}
