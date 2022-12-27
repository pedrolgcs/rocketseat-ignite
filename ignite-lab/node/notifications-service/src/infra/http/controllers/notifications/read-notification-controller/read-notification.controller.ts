import { Controller, Patch, Param } from '@nestjs/common';
import { ReadNotificationUseCase } from '@/application/notification/use-cases/read-notification';

@Controller('notifications')
export class ReadNotificationController {
  constructor(private readNotificationUseCase: ReadNotificationUseCase) {}

  @Patch(':id/read')
  async handle(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({ notificationId: id });
  }
}
