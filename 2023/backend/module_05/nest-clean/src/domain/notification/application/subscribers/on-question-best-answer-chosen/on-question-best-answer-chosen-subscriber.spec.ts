import { describe, it, beforeEach, vi, expect, SpyInstance } from 'vitest'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases'
import { makeAnswer, makeQuestion } from '@/test/factories'
import {
  InMemoryAnswersRepository,
  InMemoryQuestionsRepository,
  InMemoryNotificationsRepository,
} from '@/test/repositories/in-memory'
import { waitFor } from '@/test/utils/wait-for'
import { OnQuestionBestAnswerChosenSubscriber } from './on-question-best-answer-chosen-subscriber'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance

describe('OnQuestionBestAnswerChosenSubscriber', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnQuestionBestAnswerChosenSubscriber(
      inMemoryAnswersRepository,
      sendNotificationUseCase,
    )
  })

  it('should be able to send notification when question has new best answer chosen', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    await Promise.all([
      inMemoryQuestionsRepository.create(question),
      inMemoryAnswersRepository.create(answer),
    ])

    question.bestAnswerId = answer.id

    await inMemoryQuestionsRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalledTimes(1)
    })
  })
})
