import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from '@/application/notification/use-cases/send-notification/send-notification-use-case';
import { DatabaseModule } from '@/infra/database/database.module';
import { SendNotificationsController } from './send-notification.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [SendNotificationsController],
  providers: [SendNotificationUseCase],
})
export class SendNotificationModule {}
