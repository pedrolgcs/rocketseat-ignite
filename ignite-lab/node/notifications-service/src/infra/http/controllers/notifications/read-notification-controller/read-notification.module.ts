import { Module } from '@nestjs/common';
import { ReadNotificationUseCase } from '@/application/notification/use-cases/read-notification';
import { DatabaseModule } from '@/infra/database/database.module';
import { ReadNotificationController } from './read-notification.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ReadNotificationController],
  providers: [ReadNotificationUseCase],
})
export class ReadNotificationModule {}
