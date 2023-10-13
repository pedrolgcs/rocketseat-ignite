import { Module } from '@nestjs/common'
import {
  AuthenticateStudentUseCase,
  CreateQuestionUseCase,
  FetchRecentQuestionsUseCase,
  RegisterStudentUseCase,
} from '@/domain/forum/application/use-cases'
import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateController } from './controllers/authenticate/authenticate.controller'
import { CreateAccountController } from './controllers/create-account/create-account.controller'
import { CreateQuestionController } from './controllers/create-question/create-question.controller'
import { FetchRecentQuestions } from './controllers/fetch-recent-questions/fetch-recent-questions.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestions,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
  ],
})
export class HttpModule {}
