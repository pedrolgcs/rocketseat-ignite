import { Either, left, right } from '@/core/either'
import {
  QuestionsRepository,
  AnswersRepository,
} from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'
import { ResourceNotFoundError, NotAllowedError } from '../_errors'

type Request = {
  answerId: string
  authorId: string
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { answerId, authorId } = request

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}

export { ChooseQuestionBestAnswerUseCase }
