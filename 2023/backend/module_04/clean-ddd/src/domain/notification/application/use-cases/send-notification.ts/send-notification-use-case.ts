import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotificationsRepository } from '@/domain/notification/application/repositories'
import { Notification } from '@/domain/notification/enterprise/entities'

type Request = {
  recipientId: string
  title: string
  content: string
}

type Response = Either<
  null,
  {
    notification: Notification
  }
>

class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { recipientId, title, content } = request

    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({
      notification,
    })
  }
}

export { SendNotificationUseCase }
