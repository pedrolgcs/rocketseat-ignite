import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '@/domain/forum/application/repositories'
import {
  Answer,
  AnswerAttachment,
  AnswerAttachmentList,
} from '@/domain/forum/enterprise/entities'

type Request = {
  authorId: string
  questionId: string
  content: string
  attachmentsIds: string[]
}

type Response = Either<
  null,
  {
    answer: Answer
  }
>

@Injectable()
class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { authorId, questionId, content, attachmentsIds } = request

    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        answerId: answer.id,
        attachmentId: new UniqueEntityID(attachmentId),
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({
      answer,
    })
  }
}

export { AnswerQuestionUseCase }
