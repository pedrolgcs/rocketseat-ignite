import { Either, right } from '@/core/either'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories'
import { QuestionComment } from '@/domain/forum/enterprise/entities'

type Request = {
  questionId: string
  page: number
}

type Response = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { questionId, page } = request

    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}

export { FetchQuestionCommentsUseCase }
