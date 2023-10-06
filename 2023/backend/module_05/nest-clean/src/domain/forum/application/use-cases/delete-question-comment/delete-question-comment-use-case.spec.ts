import { describe, it, expect, beforeEach } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from '@/test/factories'
import { InMemoryQuestionCommentsRepository } from '@/test/repositories/in-memory'
import { NotAllowedError } from '../_errors'
import { DeleQuestionCommentUseCase } from './delete-question-comment-use-case'

let sut: DeleQuestionCommentUseCase
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository

describe('DeleQuestionComment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete an comment question', async () => {
    const newQuestionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-comment-1'),
    )

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    await sut.execute({
      authorId: 'author-1',
      questionCommentId: 'question-comment-1',
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an question comment from another user', async () => {
    const newQuestionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-comment-1'),
    )

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    const result = await sut.execute({
      authorId: 'another-author',
      questionCommentId: 'question-comment-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
