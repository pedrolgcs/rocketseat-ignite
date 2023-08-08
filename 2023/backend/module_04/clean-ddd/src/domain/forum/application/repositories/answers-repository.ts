import { Answer } from '@/domain/forum/enterprise/entities'

interface AnswersRepository {
  findById(id: string): Promise<Answer | null>
  create(answer: Answer): Promise<void>
  delete(answerId: string): Promise<void>
}

export { AnswersRepository }
