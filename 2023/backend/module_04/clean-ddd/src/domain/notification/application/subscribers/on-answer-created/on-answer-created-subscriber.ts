import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases'

class OnAnswerCreatedSubscriber implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.execute.bind(this), AnswerCreatedEvent.name)
  }

  private async execute(event: AnswerCreatedEvent) {
    const { answer } = event

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return
    }

    await this.sendNotification.execute({
      recipientId: question.authorId.toString(),
      title: `Nova resposta em "${question.title
        .substring(0, 40)
        .concat('...')}"`,
      content: answer.excerpt,
    })
  }
}

export { OnAnswerCreatedSubscriber }
