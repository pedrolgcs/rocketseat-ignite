import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'

const pageQueryParamSchema = z.object({
  page: z.coerce.number().optional().default(1).pipe(z.number().min(1)),
  per_page: z.coerce.number().optional().default(10).pipe(z.number().min(1)),
})

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type QuerySchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
class FetchRecentQuestions {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Query(queryValidationPipe) query: QuerySchema) {
    const { page, per_page: perPage } = query

    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: { createdAt: 'desc' },
    })

    return {
      questions,
    }
  }
}

export { FetchRecentQuestions }
