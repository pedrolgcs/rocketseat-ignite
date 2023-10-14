import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { QuestionPresenter } from '@/infra/http/presenters'

const pageQueryParamSchema = z.object({
  page: z.coerce.number().optional().default(1).pipe(z.number().min(1)),
  per_page: z.coerce.number().optional().default(20).pipe(z.number().min(1)),
})

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type QuerySchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
class FetchRecentQuestions {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(@Query(queryValidationPipe) query: QuerySchema) {
    const { page, per_page: perPage } = query

    const result = await this.fetchRecentQuestions.execute({ page, perPage })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const questionToHttp = result.value.questions.map((question) =>
      QuestionPresenter.toHTTP(question),
    )

    return {
      questions: questionToHttp,
    }
  }
}

export { FetchRecentQuestions }
