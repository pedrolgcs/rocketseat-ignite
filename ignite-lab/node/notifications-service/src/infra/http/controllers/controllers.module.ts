import { SendNotificationUseCase } from '@/application/notification/use-cases/send-notification/send-notification-use-case';
import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './notification/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotificationUseCase],
  exports: [DatabaseModule],
})
export class ControllersModule {}
