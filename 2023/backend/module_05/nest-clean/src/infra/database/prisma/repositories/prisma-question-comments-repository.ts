import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories'
import { QuestionComment } from '@/domain/forum/enterprise/entities'
import { PrismaQuestionCommentMapper } from '../mappers'
import { PrismaService } from '../prisma.service'

@Injectable()
class PrismaQuestionCommentsRepository implements QuestionCommentsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!questionComment) {
      return null
    }

    const questionCommentToDomain =
      PrismaQuestionCommentMapper.toDomain(questionComment)

    return questionCommentToDomain
  }

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    const { page, perPage } = params

    const questionComments = await this.prisma.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        questionId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    const questionCommentsToDomain = questionComments.map(
      PrismaQuestionCommentMapper.toDomain,
    )

    return questionCommentsToDomain
  }

  async create(questionComment: QuestionComment): Promise<void> {
    const questionCommentToPrisma =
      PrismaQuestionCommentMapper.toPrisma(questionComment)

    await this.prisma.comment.create({
      data: questionCommentToPrisma,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id,
      },
    })
  }
}

export { PrismaQuestionCommentsRepository }
