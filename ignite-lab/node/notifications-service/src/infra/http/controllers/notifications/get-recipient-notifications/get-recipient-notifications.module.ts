import { Module } from '@nestjs/common';
import { GetRecipientNotificationsUseCase } from '@/application/notification/use-cases/get-recipient-notifications';
import { DatabaseModule } from '@/infra/database/database.module';
import { GetRecipientNotificationsController } from './get-recipient-notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [GetRecipientNotificationsController],
  providers: [GetRecipientNotificationsUseCase],
})
export class GetRecipientNotificationsModule {}
