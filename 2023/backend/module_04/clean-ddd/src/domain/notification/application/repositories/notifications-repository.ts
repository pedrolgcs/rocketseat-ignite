import { Notification } from '@/domain/notification/enterprise/entities'

interface NotificationsRepository {
  create(notification: Notification): Promise<void>
}

export { NotificationsRepository }
