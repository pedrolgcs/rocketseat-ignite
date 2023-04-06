import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { ParsedUrlQuery } from 'querystring'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'

function withSSRAuth<P extends { [key: string]: any }>(
  fn: (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    session: Session,
  ) => Promise<GetServerSidePropsResult<P>>,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const session = await getServerSession(
      ctx.req,
      ctx.res,
      buildNextAuthOptions(ctx.req, ctx.res),
    )

    if (!session) {
      return {
        redirect: {
          destination: '/register/connect-calendar',
          permanent: false,
        },
      }
    }

    return await fn(ctx, session)
  }
}

export { withSSRAuth }
