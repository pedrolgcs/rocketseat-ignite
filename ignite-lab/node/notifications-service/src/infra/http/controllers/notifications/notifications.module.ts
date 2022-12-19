import { Module } from '@nestjs/common';
import { SendNotificationModule } from './send-notification-controller/send-notification.module';

@Module({
  imports: [SendNotificationModule],
})
export class NotificationsModule {}
