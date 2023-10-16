import { Injectable } from '@nestjs/common'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities'
import { PrismaQuestionAttachmentMapper } from '../mappers'
import { PrismaService } from '../prisma.service'

@Injectable()
class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: {
        questionId,
      },
    })

    const questionAttachmentsToDomain = questionAttachments.map(
      PrismaQuestionAttachmentMapper.toDomain,
    )

    return questionAttachmentsToDomain
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      },
    })
  }
}

export { PrismaQuestionAttachmentsRepository }
