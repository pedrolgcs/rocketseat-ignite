import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list'

type Request = {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
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
    const { authorId, title, content, attachmentsIds } = request

    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        questionId: question.id,
        attachmentId: new UniqueEntityID(attachmentId),
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)

    return right({
      question,
    })
  }
}

export { CreateQuestionUseCase }
