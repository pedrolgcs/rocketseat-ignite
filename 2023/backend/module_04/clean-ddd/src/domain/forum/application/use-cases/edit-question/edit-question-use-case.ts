import { Either, right, left } from '@/core/either'
import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'
import { NotAllowedError, ResourceNotFoundError } from '../_errors'

type Request = {
  authorId: string
  questionId: string
  title: string
  content: string
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { authorId, questionId, title, content } = request

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}

export { EditQuestionUseCase }
