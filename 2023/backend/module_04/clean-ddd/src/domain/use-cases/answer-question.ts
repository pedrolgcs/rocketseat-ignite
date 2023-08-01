import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

type Request = {
  instructorId: string
  questionId: string
  content: string
}

class AnswerQuestion {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute(request: Request) {
    const { instructorId, questionId, content } = request

    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return answer
  }
}

export { AnswerQuestion }
