import { Module } from '@nestjs/common'
import {
  QuestionsRepository,
  QuestionCommentsRepository,
  QuestionAttachmentsRepository,
  AnswersRepository,
  AnswerCommentsRepository,
  AnswerAttachmentsRepository,
} from '@/domain/forum/application/repositories'
import { PrismaService } from './prisma/prisma.service'
import {
  PrismaQuestionsRepository,
  PrismaQuestionCommentsRepository,
  PrismaQuestionAttachmentsRepository,
  PrismaAnswerRepository,
  PrismaAnswerCommentsRepository,
  PrismaAnswerAttachmentsRepository,
} from './prisma/repositories'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswerRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
  ],
})
export class DatabaseModule {}
