import { NotificationsRepository } from '@/domain/notification/application/repositories'
import { Notification } from '@/domain/notification/enterprise/entities'

class InMemoryNotificationsRepository implements NotificationsRepository {
  public items: Notification[] = []

  async create(question: Notification): Promise<void> {
    this.items.push(question)
  }
}

export { InMemoryNotificationsRepository }
