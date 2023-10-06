import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { AuthenticateController } from './controllers/authenticate/authenticate.controller'
import { CreateAccountController } from './controllers/create-account/create-account.controller'
import { CreateQuestionController } from './controllers/create-question/create-question.controller'
import { FetchRecentQuestions } from './controllers/fetch-recent-questions/fetch-recent-questions.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestions,
  ],
})
export class HttpModule {}
