import { Controller, Patch, Param } from '@nestjs/common';
import { CancelNotificationUseCase } from '@/application/notification/use-cases/cancel-notification';

@Controller('notifications')
export class CancelNotificationController {
  constructor(private cancelNotificationUseCase: CancelNotificationUseCase) {}

  @Patch(':id/cancel')
  async handle(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({ notificationId: id });
  }
}
