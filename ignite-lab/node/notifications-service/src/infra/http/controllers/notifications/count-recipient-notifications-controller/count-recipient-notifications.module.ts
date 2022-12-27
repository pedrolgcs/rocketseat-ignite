import { Module } from '@nestjs/common';
import { CountRecipientNotificationsUseCase } from '@/application/notification/use-cases/count-recipient-notifications';
import { DatabaseModule } from '@/infra/database/database.module';
import { CountRecipientNotificationsController } from './count-recipient-notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CountRecipientNotificationsController],
  providers: [CountRecipientNotificationsUseCase],
})
export class CountRecipientNotificationsModule {}
