import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import decoded from 'jwt-decode';

// utils
import { validateUserPermissions } from './validateUserPermissions';

// erros
import { AuthTokenError } from '../../services/errors/AuthTokenError';

type User = {
  permissions: string[];
  roles: string[];
};

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
};

function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['nextauth.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (options) {
      const user = decoded<User>(token);
      const { permissions, roles } = options;

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles,
      });

      if (!userHasValidPermissions) {
        return {
          notFound: true,
          /*
          redirect: {
            destination: '/',
            permanent: false,
          },
          */
        };
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'nextauth.token');
        destroyCookie(ctx, 'nextauth.refreshToken');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      console.error('[api] - ', err);

      // TODO: verify return type
      return {
        props: {} as P,
      };
    }
  };
}

export { withSSRAuth };
