import Elysia from 'elysia'
import { z } from 'zod'

import { makeSendAuthenticateLinkUseCase } from '@/infra/factories/use-cases'
import { UseCaseValidationError, ZodValidationError } from '@/infra/http/errors'

const bodySchema = z.object({
  email: z.string().email(),
})

export const sendAuthLinkRouter = new Elysia().post(
  '/authenticate',
  async ({ body, set }) => {
    const parseBody = bodySchema.safeParse(body)

    if (!parseBody.success) {
      throw new ZodValidationError({ error: parseBody.error })
    }

    const { email } = parseBody.data

    const sendAuthenticateLink = makeSendAuthenticateLinkUseCase()

    const result = await sendAuthenticateLink.execute({ email })

    if (result.isLeft()) {
      throw new UseCaseValidationError({
        message: result.value.message,
        friendlyMessage: result.value.friendlyMessage,
      })
    }

    set.status = 204

    return {
      url: result.value.url,
    }
  },
)
