import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const bodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: BodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body

    await this.prisma.question.create({
      data: {
        title,
        content,
        slug: this.convertToSlug(title),
        authorId: user.sub,
      },
    })
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}

export { CreateQuestionController }
