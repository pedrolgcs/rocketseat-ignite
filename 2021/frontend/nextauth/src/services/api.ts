import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

// erros
import { AuthTokenError } from './errors/AuthTokenError';

type FailedRequestQueue = {
  onSuccess(token: string): void;
  onFailure(err: AxiosError): void;
};

type Context = undefined | GetServerSidePropsContext;

// control variables
let isRefreshing = false;
let failedRequestsQueue: FailedRequestQueue[] = [];

// only browser
function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');
  Router.push('/');
}

function setupAPIClient(ctx: Context = undefined) {
  // get cookies
  let cookies = parseCookies(ctx);

  // create api instance
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`,
    },
  });

  // intercept axios response for try refresh token
  api.interceptors.response.use(
    (response) => {
      // it's ok
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          // get cookies
          cookies = parseCookies(ctx);

          // get refreshToken
          const { 'nextauth.refreshToken': refreshToken } = cookies;

          // get request config
          const originalConfig = error.config;

          // verify if another request is not running
          if (!isRefreshing) {
            isRefreshing = true;

            // request to refresh token
            api
              .post('/refresh', {
                refreshToken,
              })
              .then((response) => {
                const { token, refreshToken: newRefreshToken } = response.data;

                // update token
                setCookie(ctx, 'nextauth.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                });

                // update refreshToken
                setCookie(ctx, 'nextauth.refreshToken', newRefreshToken, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                });

                // @ts-ignore
                // update default headers with new token
                api.defaults.headers['Authorization'] = `Bearer ${token}`;

                // execute queues passing new token
                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                );

                // clear queues
                failedRequestsQueue = [];
              })
              .catch((err) => {
                // execute queues passing error
                failedRequestsQueue.forEach((request) =>
                  request.onFailure(err)
                );

                // clear queues
                failedRequestsQueue = [];

                // logout
                if (process.browser) {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          // put requests in queue
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                // @ts-ignore
                originalConfig.headers['Authorization'] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        }
        // another authentication error
        else {
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      // another kind of error
      return Promise.reject(error);
    }
  );

  return api;
}

const browserClient = setupAPIClient();

export { setupAPIClient, browserClient };
