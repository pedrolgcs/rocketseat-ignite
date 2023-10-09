import { Question } from '@/domain/forum/enterprise/entities'

class QuestionPresenter {
  static toHTTP(question: Question) {
    return {
      id: question.id.toString(),
      title: question.title,
      slug: question.slug.value,
      bestAnswer: question.bestAnswerId?.toString() ?? null,
      content: question.content,
      created_at: question.createdAt,
      updated_at: question.updatedAt,
    }
  }
}

export { QuestionPresenter }
