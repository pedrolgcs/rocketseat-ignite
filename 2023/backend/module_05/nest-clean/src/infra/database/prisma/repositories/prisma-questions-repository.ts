import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'
import { PrismaQuestionMapper } from '../mappers'
import { PrismaService } from '../prisma.service'

@Injectable()
class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }

    const questionToDomain = PrismaQuestionMapper.toDomain(question)

    return questionToDomain
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })

    if (!question) {
      return null
    }

    const questionToDomain = PrismaQuestionMapper.toDomain(question)

    return questionToDomain
  }

  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    const { page, perPage } = params

    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    const questionsToDomain = questions.map(PrismaQuestionMapper.toDomain)

    return questionsToDomain
  }

  async create(question: Question): Promise<void> {
    const questionToPrisma = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.create({
      data: questionToPrisma,
    })
  }

  async save(question: Question): Promise<void> {
    const questionToPrisma = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.update({
      where: {
        id: question.id.toString(),
      },
      data: questionToPrisma,
    })
  }

  async delete(questionId: string): Promise<void> {
    await this.prisma.question.delete({
      where: {
        id: questionId,
      },
    })
  }
}

export { PrismaQuestionsRepository }
