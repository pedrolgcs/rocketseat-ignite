import { Elysia } from 'elysia'

import { makeGetUserUseCase } from '@/infra/factories/use-cases'
import { UseCaseValidationError } from '@/infra/http/errors'
import { auth } from '@/infra/http/plugins'

import { UserPresenter } from '../presenters'

export const getProfile = new Elysia()
  .use(auth)
  .get('/me', async ({ getCurrentUser }) => {
    const { userId } = await getCurrentUser()

    const getUser = makeGetUserUseCase()

    const getUserResult = await getUser.execute({ userId })

    if (getUserResult.isLeft()) {
      throw new UseCaseValidationError({
        message: getUserResult.value.message,
        friendlyMessage: getUserResult.value.friendlyMessage,
      })
    }

    const { user } = getUserResult.value

    return UserPresenter.toHTTP(user)
  })
