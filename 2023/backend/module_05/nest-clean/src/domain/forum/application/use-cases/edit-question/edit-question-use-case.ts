import { Either, right, left } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionsRepository,
  QuestionAttachmentsRepository,
} from '@/domain/forum/application/repositories'
import {
  Question,
  QuestionAttachment,
  QuestionAttachmentList,
} from '@/domain/forum/enterprise/entities'
import { NotAllowedError, ResourceNotFoundError } from '../_errors'

type Request = {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { authorId, questionId, title, content, attachmentsIds } = request

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        questionId: question.id,
        attachmentId: new UniqueEntityID(attachmentId),
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}

export { EditQuestionUseCase }
