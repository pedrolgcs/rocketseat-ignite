import { Controller, Patch, Param } from '@nestjs/common';
import { UnreadNotificationUseCase } from '@/application/notification/use-cases/unread-notification';

@Controller('notifications')
export class UnreadNotificationController {
  constructor(private unreadNotificationUseCase: UnreadNotificationUseCase) {}

  @Patch(':id/unread')
  async handle(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({ notificationId: id });
  }
}
