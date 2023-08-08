import { QuestionsRepository } from '@/domain/forum/application/repositories'

type Request = {
  authorId: string
  questionId: string
}

type Response = Record<string, never>

class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { questionId, authorId } = request

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionsRepository.delete(questionId)

    return {}
  }
}

export { DeleteQuestionUseCase }
