import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id === id)

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

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async delete(questionId: string): Promise<void> {
    const questionIndex = this.items.findIndex((item) => item.id === questionId)

    if (questionIndex >= 0) {
      this.items.splice(questionIndex, 1)
    }
  }
}

export { InMemoryQuestionsRepository }
