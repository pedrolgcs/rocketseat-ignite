import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const bodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachmentsIds: z.array(z.string()).optional().default([]),
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: BodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, attachmentsIds } = body

    await this.createQuestion.execute({
      title,
      content,
      authorId: user.sub,
      attachmentsIds,
    })
  }
}

export { CreateQuestionController }
