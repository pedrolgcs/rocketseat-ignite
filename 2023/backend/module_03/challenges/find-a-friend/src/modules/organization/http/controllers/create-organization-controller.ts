import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrganizationUseCase } from '@/modules/organization/use-cases/create-organization'

class CreateOrganizationController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      cep: z.string(),
      address: z.string(),
      phone: z.string(),
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const { name, email, password, cep, address, phone, latitude, longitude } =
      bodySchema.parse(request.body)

    const createOrganizationUseCase = makeCreateOrganizationUseCase()

    await createOrganizationUseCase.execute({
      name,
      email,
      password,
      cep,
      address,
      phone,
      latitude,
      longitude,
    })

    return reply.status(201).send()
  }
}

export { CreateOrganizationController }
