import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateOrganizationUseCase } from '@/modules/organization/use-cases/authenticate-organization'

class AuthenticateOrganizationController {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = bodySchema.parse(request.body)

    const authenticateOrganizationUseCase =
      makeAuthenticateOrganizationUseCase()

    const { organization } = await authenticateOrganizationUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {}, // payload here
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  }
}

export { AuthenticateOrganizationController }
