import { AnswerAttachment } from '@/domain/forum/enterprise/entities'

abstract class AnswerAttachmentsRepository {
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>

  abstract deleteManyByAnswerId(answerId: string): Promise<void>
}

export { AnswerAttachmentsRepository }
