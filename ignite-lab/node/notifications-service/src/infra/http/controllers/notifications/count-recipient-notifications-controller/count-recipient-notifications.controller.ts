import { Controller, Param, Get } from '@nestjs/common';
import { CountRecipientNotificationsUseCase } from '@/application/notification/use-cases/count-recipient-notifications';

@Controller('notifications')
export class CountRecipientNotificationsController {
  constructor(
    private countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
  ) {}

  @Get('count/from/:recipientId')
  async handle(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return {
      count,
    };
  }
}
