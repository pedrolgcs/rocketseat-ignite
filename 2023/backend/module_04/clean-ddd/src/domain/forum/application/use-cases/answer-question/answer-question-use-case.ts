import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'

type Request = {
  instructorId: string
  questionId: string
  content: string
}

type Response = Either<
  null,
  {
    answer: Answer
  }
>

class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { instructorId, questionId, content } = request

    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return right({
      answer,
    })
  }
}

export { AnswerQuestionUseCase }
