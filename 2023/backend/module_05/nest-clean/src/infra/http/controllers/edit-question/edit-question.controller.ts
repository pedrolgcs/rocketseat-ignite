import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases'
import {
  NotAllowedError,
  ResourceNotFoundError,
} from '@/domain/forum/application/use-cases/_errors'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const bodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachmentsIds: z.array(z.string()).optional().default([]),
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Controller('/questions/:id')
// @UseGuards(JwtAuthGuard) example of using decorator
class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: BodySchema,
    @Param('id') questionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, attachmentsIds } = body

    const result = await this.editQuestion.execute({
      title,
      content,
      questionId,
      authorId: user.sub,
      attachmentsIds,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}

export { EditQuestionController }
