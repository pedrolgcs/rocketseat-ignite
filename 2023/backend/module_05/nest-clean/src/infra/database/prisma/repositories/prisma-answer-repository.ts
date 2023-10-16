import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'
import { PrismaAnswerMapper } from '../mappers'
import { PrismaService } from '../prisma.service'

@Injectable()
class PrismaAnswerRepository implements AnswersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    })

    if (!answer) {
      return null
    }

    const answerToDomain = PrismaAnswerMapper.ToDomain(answer)

    return answerToDomain
  }

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    const { page, perPage } = params

    const answers = await this.prisma.answer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        questionId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    const answersToDomain = answers.map(PrismaAnswerMapper.ToDomain)

    return answersToDomain
  }

  async create(answer: Answer): Promise<void> {
    const answerToPrisma = PrismaAnswerMapper.toPrisma(answer)

    await this.prisma.answer.create({
      data: answerToPrisma,
    })
  }

  async save(answer: Answer): Promise<void> {
    const answerToPrisma = PrismaAnswerMapper.toPrisma(answer)

    await this.prisma.answer.update({
      where: {
        id: answerToPrisma.id,
      },
      data: answerToPrisma,
    })
  }

  async delete(answerId: string): Promise<void> {
    await this.prisma.answer.delete({
      where: {
        id: answerId,
      },
    })
  }
}

export { PrismaAnswerRepository }
