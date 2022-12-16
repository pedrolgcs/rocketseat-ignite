import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { SendNotificationModule } from './send-notification-controller/send-notification.module';

@Module({
  imports: [DatabaseModule, SendNotificationModule],
})
export class NotificationsModule {}
