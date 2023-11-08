import { Injectable } from '@nestjs/common'
import { Either, right, left } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswersRepository,
  AnswerAttachmentsRepository,
} from '@/domain/forum/application/repositories'
import {
  Answer,
  AnswerAttachment,
  AnswerAttachmentList,
} from '@/domain/forum/enterprise/entities'
import { NotAllowedError, ResourceNotFoundError } from '../_errors'

type Request = {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

@Injectable()
class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { authorId, answerId, content, attachmentsIds } = request

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        answerId: answer.id,
        attachmentId: new UniqueEntityID(attachmentId),
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.content = content
    answer.attachments = answerAttachmentList

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}

export { EditAnswerUseCase }
