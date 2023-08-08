import { AnswersRepository } from '@/domain/forum/application/repositories'

type Request = {
  authorId: string
  answerId: string
}

type Response = Record<string, never>

class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { answerId, authorId } = request

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answersRepository.delete(answerId)

    return {}
  }
}

export { DeleteAnswerUseCase }
