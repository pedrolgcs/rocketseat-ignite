import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories'
import { NotAllowedError, ResourceNotFoundError } from '../_errors'

type Request = {
  authorId: string
  questionCommentId: string
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

class DeleQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { questionCommentId, authorId } = request

    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId,
    )

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== questionComment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionCommentId)

    return right({})
  }
}

export { DeleQuestionCommentUseCase }
