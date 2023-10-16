import { Injectable } from '@nestjs/common'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities'
import { PrismaAnswerAttachmentMapper } from '../mappers'
import { PrismaService } from '../prisma.service'

@Injectable()
class PrismaAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: {
        answerId,
      },
    })

    const answerAttachmentsToDomain = answerAttachments.map(
      PrismaAnswerAttachmentMapper.toDomain,
    )

    return answerAttachmentsToDomain
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      },
    })
  }
}

export { PrismaAnswerAttachmentsRepository }
