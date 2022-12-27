import { Module } from '@nestjs/common';
import { CancelNotificationUseCase } from '@/application/notification/use-cases/cancel-notification';
import { DatabaseModule } from '@/infra/database/database.module';
import { CancelNotificationController } from './cancel-notification.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CancelNotificationController],
  providers: [CancelNotificationUseCase],
})
export class CancelNotificationModule {}
