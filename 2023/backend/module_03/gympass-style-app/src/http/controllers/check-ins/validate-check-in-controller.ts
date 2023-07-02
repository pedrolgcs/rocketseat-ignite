import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/use-cases/check-ins'

class ValidateCheckIn {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      checkInId: z.string().uuid(),
    })

    const { checkInId } = paramsSchema.parse(request.query)

    const validateCheckInUseCase = makeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({
      checkInId,
    })

    return reply.status(204).send()
  }
}

export { ValidateCheckIn }
