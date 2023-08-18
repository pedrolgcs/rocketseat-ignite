import { AnswerCommentsRepository } from '@/domain/forum/application/repositories'

type Request = {
  authorId: string
  answerCommentId: string
}

type Response = void

class DeleAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { answerCommentId, authorId } = request

    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId,
    )

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerCommentId)
  }
}

export { DeleAnswerCommentUseCase }
