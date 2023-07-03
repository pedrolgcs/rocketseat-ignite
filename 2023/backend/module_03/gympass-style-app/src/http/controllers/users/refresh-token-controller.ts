import { FastifyReply, FastifyRequest } from 'fastify'

class RefreshTokenController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({ onlyCookie: true })

    const { sub: userId, role } = request.user

    const token = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub: userId,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub: userId,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({
        token,
      })
  }
}

export { RefreshTokenController }
