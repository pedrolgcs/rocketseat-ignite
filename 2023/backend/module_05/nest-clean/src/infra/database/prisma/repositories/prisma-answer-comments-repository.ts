import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories'
import { AnswerComment } from '@/domain/forum/enterprise/entities'
import { PrismaAnswerCommentMapper } from '../mappers'
import { PrismaService } from '../prisma.service'

@Injectable()
class PrismaAnswerCommentsRepository implements AnswerCommentsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: { id },
    })

    if (!answerComment) {
      return null
    }

    const answerCommentToDomai =
      PrismaAnswerCommentMapper.toDomain(answerComment)

    return answerCommentToDomai
  }

  async findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    const { page, perPage } = params

    const answerComments = await this.prisma.comment.findMany({
      where: { answerId },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    const answerCommentsToDomain = answerComments.map(
      PrismaAnswerCommentMapper.toDomain,
    )

    return answerCommentsToDomain
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const answerCommentToPrisma =
      PrismaAnswerCommentMapper.toPrisma(answerComment)

    await this.prisma.comment.create({
      data: answerCommentToPrisma,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.comment.delete({
      where: { id },
    })
  }
}

export { PrismaAnswerCommentsRepository }
