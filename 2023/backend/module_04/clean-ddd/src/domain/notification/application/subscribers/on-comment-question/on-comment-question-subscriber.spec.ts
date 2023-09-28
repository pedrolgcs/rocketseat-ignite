import { describe, it, beforeEach, vi, expect, SpyInstance } from 'vitest'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases'
import { makeQuestionComment, makeQuestion } from '@/test/factories'
import {
  InMemoryQuestionsRepository,
  InMemoryQuestionCommentsRepository,
  InMemoryNotificationsRepository,
} from '@/test/repositories/in-memory'
import { waitFor } from '@/test/utils/wait-for'
import { OnCommentQuestionSubscriber } from './on-comment-question-subscriber'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance

describe('OnCommentQuestionSubscriber', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnCommentQuestionSubscriber(
      inMemoryQuestionsRepository,
      sendNotificationUseCase,
    )
  })

  it('should be able to send notification when comment an question', async () => {
    const question = makeQuestion()
    const questionComment = makeQuestionComment({
      questionId: question.id,
    })

    await Promise.all([
      inMemoryQuestionsRepository.create(question),
      inMemoryQuestionCommentsRepository.create(questionComment),
    ])

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalledTimes(1)
    })
  })
})
