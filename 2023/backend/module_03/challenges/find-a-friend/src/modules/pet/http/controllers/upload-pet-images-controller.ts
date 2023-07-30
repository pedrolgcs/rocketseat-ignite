import fs from 'node:fs'
import { FastifyReply, FastifyRequest } from 'fastify'
import pump from 'pump'
import { z } from 'zod'
import { makeUploadPetImagesUseCase } from '@/modules/pet/use-cases/upload-pet-images'

class UploadPetImagesController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const files = request.files()

    const imagesName = []

    for await (const part of files) {
      const storedFile = fs.createWriteStream(`./tmp/${part.filename}`)

      imagesName.push(part.filename)

      pump(part.file, storedFile)
    }

    const uploadPetImagesUseCase = makeUploadPetImagesUseCase()

    await uploadPetImagesUseCase.execute({
      petId: id,
      imagesName,
    })

    reply.status(201).send()
  }
}

export { UploadPetImagesController }
