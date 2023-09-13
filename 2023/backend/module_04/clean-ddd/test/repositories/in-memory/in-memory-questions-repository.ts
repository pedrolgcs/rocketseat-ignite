import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'
import { InMemoryQuestionAttachmentsRepository } from './in-memory-question-attachments-repository'

class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentRepository: InMemoryQuestionAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    const { page } = params

    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )

    if (questionIndex >= 0) {
      this.items[questionIndex] = question
    }
  }

  async delete(questionId: string): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id.toString() === questionId,
    )

    if (questionIndex >= 0) {
      this.items.splice(questionIndex, 1)

      this.questionAttachmentRepository.deleteManyByQuestionId(questionId)
    }
  }
}

export { InMemoryQuestionsRepository }
