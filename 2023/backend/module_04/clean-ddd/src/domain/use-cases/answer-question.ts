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

    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
    })

    await this.answersRepository.create(answer)

    return answer
  }
}

export { AnswerQuestion }
