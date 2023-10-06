import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeNotification } from '@/test/factories'
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory'
import { NotAllowedError, ResourceNotFoundError } from '../_errors'
import { ReadNotificationUseCase } from './read-notification-use-case'

let sut: ReadNotificationUseCase
let inMemoryNotificationsRepository: InMemoryNotificationsRepository

describe('ReadNotification', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const now = new Date(2023, 1, 1)
    vi.setSystemTime(now)

    await inMemoryNotificationsRepository.create(
      makeNotification(
        {
          recipientId: new UniqueEntityID('recipient-1'),
        },
        new UniqueEntityID('notification-1'),
      ),
    )

    const result = await sut.execute({
      notificationId: 'notification-1',
      recipientId: 'recipient-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(now)
  })

  it('should not be able to read a non existing notification', async () => {
    const result = await sut.execute({
      notificationId: 'notification-1',
      recipientId: 'recipient-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to read a notification from another user', async () => {
    await inMemoryNotificationsRepository.create(
      makeNotification(
        {
          recipientId: new UniqueEntityID('recipient-1'),
        },
        new UniqueEntityID('notification-1'),
      ),
    )

    const result = await sut.execute({
      notificationId: 'notification-1',
      recipientId: 'another-recipient',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
