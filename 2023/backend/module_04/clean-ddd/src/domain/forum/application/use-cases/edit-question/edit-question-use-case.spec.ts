import { describe, it, expect, beforeEach } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from '@/test/factories'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory'
import { NotAllowedError, ResourceNotFoundError } from '../_errors'
import { EditQuestionUseCase } from './edit-question-use-case'

let sut: EditQuestionUseCase
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

describe('EditQuestion', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit an question', async () => {
    const newQuestion = makeQuestion(
      {
        title: 'this is a new question',
        content: 'how are you?',
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'updated title',
      content: 'updated content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'updated title',
      content: 'updated content',
    })
  })

  it('should not be able to edit an question if not exists', async () => {
    const newQuestion = makeQuestion(
      {
        title: 'this is a new question',
        content: 'how are you?',
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-1',
      questionId: 'non-existent',
      title: 'updated title',
      content: 'updated content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit an question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        title: 'this is a new question',
        content: 'how are you?',
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'another-author',
      questionId: 'question-1',
      title: 'updated title',
      content: 'updated content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(NotAllowedError)
  })
})
