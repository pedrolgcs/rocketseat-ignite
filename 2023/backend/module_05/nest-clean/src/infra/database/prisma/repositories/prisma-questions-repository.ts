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

    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.')
  }

  async create(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async save(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(questionId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export { PrismaQuestionsRepository }
