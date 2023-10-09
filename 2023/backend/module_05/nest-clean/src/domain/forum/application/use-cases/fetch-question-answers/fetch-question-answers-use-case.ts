import { Either, right } from '@/core/either'
import { AnswersRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'

type Request = {
  questionId: string
  page: number
  perPage: number
}

type Response = Either<
  null,
  {
    answers: Answer[]
  }
>

class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { questionId, page, perPage } = request

    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      {
        page,
        perPage,
      },
    )

    return right({
      answers,
    })
  }
}

export { FetchQuestionAnswersUseCase }
