import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories'
import { ResourceNotFoundError, NotAllowedError } from '../_errors'

type Request = {
  authorId: string
  answerCommentId: string
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

class DeleAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { answerCommentId, authorId } = request

    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId,
    )

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answerComment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerCommentId)

    return right({})
  }
}

export { DeleAnswerCommentUseCase }
