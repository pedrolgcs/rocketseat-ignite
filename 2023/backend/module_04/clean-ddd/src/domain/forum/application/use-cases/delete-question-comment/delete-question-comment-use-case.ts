import { QuestionCommentsRepository } from '@/domain/forum/application/repositories'

type Request = {
  authorId: string
  questionCommentId: string
}

type Response = void

class DeleQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { questionCommentId, authorId } = request

    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId,
    )

    if (!questionComment) {
      throw new Error('Question comment not found')
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionCommentsRepository.delete(questionCommentId)
  }
}

export { DeleQuestionCommentUseCase }
