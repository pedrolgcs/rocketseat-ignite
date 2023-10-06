import { Either, left, right } from '@/core/either'
import {
  QuestionsRepository,
  QuestionAttachmentsRepository,
} from '@/domain/forum/application/repositories'
import { NotAllowedError, ResourceNotFoundError } from '../_errors'

type Request = {
  authorId: string
  questionId: string
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

class DeleteQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { questionId, authorId } = request

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await Promise.all([
      this.questionsRepository.delete(questionId),
      this.questionAttachmentsRepository.deleteManyByQuestionId(questionId),
    ])

    return right({})
  }
}

export { DeleteQuestionUseCase }
