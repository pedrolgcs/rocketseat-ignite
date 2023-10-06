import { Module } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AuthenticateController } from './controllers/authenticate/authenticate.controller'
import { CreateAccountController } from './controllers/create-account/create-account.controller'
import { CreateQuestionController } from './controllers/create-question/create-question.controller'
import { FetchRecentQuestions } from './controllers/fetch-recent-questions/fetch-recent-questions.controller'

@Module({
  imports: [],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestions,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
