import { Controller, Get, Param } from '@nestjs/common';
import { NotificationViewModel } from '@/infra/http/view-models/notification-view-model';
import { GetRecipientNotificationsUseCase } from '@/application/notification/use-cases/get-recipient-notifications';

@Controller('notifications')
export class GetRecipientNotificationsController {
  constructor(
    private getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
  ) {}

  @Get('from/:recipientId')
  async handle(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({ recipientId });

    return {
      notifications: notifications.map((notification) =>
        NotificationViewModel.toHTTP(notification),
      ),
    };
  }
}
