import { describe, it, expect, beforeEach } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from '@/test/factories'
import {
  InMemoryQuestionsRepository,
  InMemoryQuestionCommentsRepository,
} from '@/test/repositories/in-memory'
import { ResourceNotFoundError } from '../_errors'
import { CommentOnQuestionUseCase } from './comment-on-question-use-case'

let sut: CommentOnQuestionUseCase
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository

describe('CommentOnQuestion', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on a question', async () => {
    const question = makeQuestion({}, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: 'author-1',
      content: 'how are you?',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'how are you?',
    )
  })

  it('should not be able to comment on non existent question', async () => {
    const result = await sut.execute({
      questionId: 'non-existent-question',
      authorId: 'author-1',
      content: 'how are you?',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
