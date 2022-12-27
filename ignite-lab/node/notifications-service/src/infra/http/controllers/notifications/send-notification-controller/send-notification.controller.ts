import { Body, Controller, Post } from '@nestjs/common';
import { SendNotificationUseCase } from '@/application/notification/use-cases/send-notification';
import { CreateNotificationBody } from '@/infra/http/dtos/create-notification-body';
import { NotificationViewModel } from '@/infra/http/view-models/notification-view-model';

@Controller('notifications')
export class SendNotificationsController {
  constructor(private sendNotification: SendNotificationUseCase) {}

  @Post()
  async handle(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
