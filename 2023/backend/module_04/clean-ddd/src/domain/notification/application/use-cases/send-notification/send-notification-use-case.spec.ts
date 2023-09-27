import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory'
import { SendNotificationUseCase } from './send-notification-use-case'

let sut: SendNotificationUseCase
let inMemoryNotificationsRepository: InMemoryNotificationsRepository

describe('SendNotification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      title: 'new notification',
      content: 'new notification',
      recipientId: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
