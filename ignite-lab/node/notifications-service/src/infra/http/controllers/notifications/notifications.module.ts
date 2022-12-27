import { Module } from '@nestjs/common';
import { SendNotificationModule } from './send-notification-controller/send-notification.module';
import { ReadNotificationModule } from './read-notification-controller/read-notification.module';
import { CancelNotificationModule } from './cancel-notification-controller/cancel-notification.module';
import { GetRecipientNotificationsModule } from './get-recipient-notifications/get-recipient-notifications.module';
import { CountRecipientNotificationsModule } from './count-recipient-notifications-controller/count-recipient-notifications.module';
import { UnreadNotificationModule } from './unread-notification-controller copy/unred-notification.module';

@Module({
  imports: [
    SendNotificationModule,
    ReadNotificationModule,
    CancelNotificationModule,
    GetRecipientNotificationsModule,
    CountRecipientNotificationsModule,
    UnreadNotificationModule,
  ],
})
export class NotificationsModule {}
