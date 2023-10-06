import { Notification } from '@/domain/notification/enterprise/entities'

interface NotificationsRepository {
  findById(id: string): Promise<Notification | null>
  create(notification: Notification): Promise<void>
  save(notification: Notification): Promise<void>
}

export { NotificationsRepository }
