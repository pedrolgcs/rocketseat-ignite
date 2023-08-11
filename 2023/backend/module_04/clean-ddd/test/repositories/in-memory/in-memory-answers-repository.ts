import { AnswersRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'

class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    if (answerIndex >= 0) {
      this.items[answerIndex] = answer
    }
  }

  async delete(answerId: string): Promise<void> {
    const answerIndex = this.items.findIndex(
      (item) => item.id.toString() === answerId,
    )

    if (answerIndex >= 0) {
      this.items.splice(answerIndex, 1)
    }
  }
}

export { InMemoryAnswersRepository }
