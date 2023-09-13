import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities'

class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(questionId: string): Promise<void> {
    this.items = this.items.filter(
      (item) => item.answerId.toString() !== questionId,
    )
  }
}

export { InMemoryAnswerAttachmentsRepository }
