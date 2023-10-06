import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { QuestionCommentEvent } from '@/domain/forum/enterprise/events'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases'

class OnCommentQuestionSubscriber implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.execute.bind(this), QuestionCommentEvent.name)
  }

  private async execute(event: QuestionCommentEvent) {
    const { questionComment } = event

    const question = await this.questionsRepository.findById(
      questionComment.questionId.toString(),
    )

    if (!question) {
      return
    }

    await this.sendNotification.execute({
      recipientId: question.authorId.toString(),
      title: `Nova comentário em "${question.title
        .substring(0, 40)
        .concat('...')}"`,
      content: questionComment.content.substring(0, 20).concat('...'),
    })
  }
}

export { OnCommentQuestionSubscriber }
