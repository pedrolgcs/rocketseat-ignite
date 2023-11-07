import { Module } from '@nestjs/common'
import {
  AuthenticateStudentUseCase,
  CreateQuestionUseCase,
  FetchRecentQuestionsUseCase,
  GetQuestionBySlugUseCase,
  RegisterStudentUseCase,
  EditQuestionUseCase,
  DeleteQuestionUseCase,
  AnswerQuestionUseCase,
} from '@/domain/forum/application/use-cases'
import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import {
  AuthenticateController,
  CreateAccountController,
  CreateQuestionController,
  FetchRecentQuestionsController,
  GetQuestionBySlugController,
  EditQuestionController,
  DeleteQuestionController,
  AnswerQuestionController,
} from './controllers'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
  ],
})
export class HttpModule {}
