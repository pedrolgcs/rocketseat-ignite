import { Answer } from '@/domain/forum/enterprise/entities'

interface AnswersRepository {
  create(answer: Answer): Promise<void>
}

export { AnswersRepository }
