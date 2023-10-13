import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { compare } from 'bcryptjs'
import { z } from 'zod'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

type BodySchema = z.infer<typeof bodySchema>

@Controller('/sessions')
class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    const { email, password } = bodySchema.parse(body)

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      throw new Error('')
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}

export { AuthenticateController }
