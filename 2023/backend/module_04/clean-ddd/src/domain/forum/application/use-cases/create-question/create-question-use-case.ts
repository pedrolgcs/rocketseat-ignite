import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

type Request = {
  authorId: string
  title: string
  content: string
}

type Response = Either<
  null,
  {
    question: Question
  }
>

class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { authorId, title, content } = request

    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.questionsRepository.create(question)

    return right({
      question,
    })
  }
}

export { CreateQuestionUseCase }
