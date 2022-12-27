import { Module } from '@nestjs/common';
import { UnreadNotificationUseCase } from '@/application/notification/use-cases/unread-notification';
import { DatabaseModule } from '@/infra/database/database.module';
import { UnreadNotificationController } from './unread-notification.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UnreadNotificationController],
  providers: [UnreadNotificationUseCase],
})
export class UnreadNotificationModule {}
