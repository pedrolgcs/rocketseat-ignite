import { AnswersRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'

type Request = {
  authorId: string
  answerId: string
  content: string
}

type Response = {
  answer: Answer
}

class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { authorId, answerId, content } = request

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return {
      answer,
    }
  }
}

export { EditAnswerUseCase }
