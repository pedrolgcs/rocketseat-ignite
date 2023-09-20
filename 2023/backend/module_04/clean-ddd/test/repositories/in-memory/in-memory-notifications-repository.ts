import { NotificationsRepository } from '@/domain/notification/application/repositories'
import { Notification } from '@/domain/notification/enterprise/entities'

class InMemoryNotificationsRepository implements NotificationsRepository {
  public items: Notification[] = []

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => item.id.toString() === id)

    if (!notification) {
      return null
    }

    return notification
  }

  async create(question: Notification): Promise<void> {
    this.items.push(question)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(
      (item) => item.id.toString() === notification.id.toString(),
    )

    if (notificationIndex >= 0) {
      this.items[notificationIndex] = notification
    }
  }
}

export { InMemoryNotificationsRepository }
