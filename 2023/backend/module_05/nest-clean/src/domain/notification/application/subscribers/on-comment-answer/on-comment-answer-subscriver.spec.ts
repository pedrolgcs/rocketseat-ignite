import { describe, it, beforeEach, vi, expect, SpyInstance } from 'vitest'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases'
import { makeAnswer, makeAnswerComment } from '@/test/factories'
import {
  InMemoryAnswersRepository,
  InMemoryAnswerCommentsRepository,
  InMemoryNotificationsRepository,
} from '@/test/repositories/in-memory'
import { waitFor } from '@/test/utils/wait-for'
import { OnCommentAnswerSubscriber } from './on-comment-answer-subscriver'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance

describe('OnCommentAnswerSubscriber', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnCommentAnswerSubscriber(
      inMemoryAnswersRepository,
      sendNotificationUseCase,
    )
  })

  it('should be able to send notification when comment an answer', async () => {
    const answer = makeAnswer()
    const answerComment = makeAnswerComment({
      answerId: answer.id,
    })

    await Promise.all([
      inMemoryAnswersRepository.create(answer),
      inMemoryAnswerCommentsRepository.create(answerComment),
    ])

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalledTimes(1)
    })
  })
})
