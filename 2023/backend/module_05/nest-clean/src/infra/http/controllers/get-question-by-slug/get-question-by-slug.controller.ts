import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/_errors'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { QuestionPresenter } from '@/infra/http/presenters'

const routeSchema = z.object({
  slug: z.string(),
})

const routeValidationPipe = new ZodValidationPipe(routeSchema)

type RouteSchema = z.infer<typeof routeSchema>

@Controller('/questions/:slug')
class GetQuestionBySlugController {
  constructor(private getQuestionBySlugUseCase: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param(routeValidationPipe) params: RouteSchema) {
    const { slug } = params

    const result = await this.getQuestionBySlugUseCase.execute({ slug })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const questionToHttp = QuestionPresenter.toHTTP(result.value.question)

    return {
      question: questionToHttp,
    }
  }
}

export { GetQuestionBySlugController }
