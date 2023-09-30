import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'

const bodySchema = z.object({})

type BodySchema = z.infer<typeof bodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    // const {} = bodySchema.parse(body)

    return 'ok'
  }
}

export { CreateQuestionController }
