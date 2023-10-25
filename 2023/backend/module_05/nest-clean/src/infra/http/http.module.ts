import { Module } from '@nestjs/common'
import {
  AuthenticateStudentUseCase,
  CreateQuestionUseCase,
  FetchRecentQuestionsUseCase,
  GetQuestionBySlugUseCase,
  RegisterStudentUseCase,
  EditQuestionUseCase,
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
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
  ],
})
export class HttpModule {}
