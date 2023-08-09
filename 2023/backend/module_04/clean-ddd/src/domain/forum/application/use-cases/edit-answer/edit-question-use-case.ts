import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

type Request = {
  authorId: string
  questionId: string
  title: string
  content: string
}

type Response = {
  question: Question
}

class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { authorId, questionId, title, content } = request

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}

export { EditQuestionUseCase }
