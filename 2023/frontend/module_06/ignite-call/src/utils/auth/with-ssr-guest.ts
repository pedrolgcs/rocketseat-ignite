import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { getServerSession } from 'next-auth/next'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'

function withSSRGuest<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const session = await getServerSession(
      ctx.req,
      ctx.res,
      buildNextAuthOptions(ctx.req, ctx.res),
    )

    if (session) {
      return {
        redirect: {
          destination: `/schedule/${session.user.username}`,
          permanent: false,
        },
      }
    }

    return await fn(ctx)
  }
}

export { withSSRGuest }
