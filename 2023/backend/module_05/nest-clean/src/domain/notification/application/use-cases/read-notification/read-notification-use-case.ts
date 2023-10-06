import { Either, left, right } from '@/core/either'
import { NotificationsRepository } from '@/domain/notification/application/repositories'
import { Notification } from '@/domain/notification/enterprise/entities'
import { ResourceNotFoundError, NotAllowedError } from '../_errors'

type Reques = {
  recipientId: string
  notificationId: string
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  public async execute(request: Reques): Promise<Response> {
    const { recipientId, notificationId } = request

    const notification = await this.notificationsRepository.findById(
      notificationId,
    )

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return right({
      notification,
    })
  }
}

export { ReadNotificationUseCase }
