import { env } from '@saas/env'
import { z } from 'zod'

const OAUTH_URL = 'https://github.com/login/oauth/access_token'
const USER_OAUTH_URL = 'https://api.github.com/user'

// 'https://github.com/login/oauth/authorize?client_id=Ov23liEdqyTXisP7k4xm&scope=user:email&redirect_uri=http://localhost:3000/api/auth/callback'

export class GithubProvider {
  private static async getAuthorizationURL(code: string) {
    const githubOAuthURL = new URL(OAUTH_URL)
    githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
    githubOAuthURL.searchParams.set(
      'client_secret',
      env.GITHUB_OAUTH_CLIENT_SECRET,
    )
    githubOAuthURL.searchParams.set(
      'redirect_uri',
      env.GITHUB_OAUTH__CLIENT_REDIRECT_URI,
    )
    githubOAuthURL.searchParams.set('code', code)

    return githubOAuthURL
  }

  static async getAccessToken(code: string) {
    const githubOAuthURL = await this.getAuthorizationURL(code)

    const githubAccessTokenResponse = await fetch(githubOAuthURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })

    const githubAccessTokenData = await githubAccessTokenResponse.json()

    const { access_token: githubAccessToken } = z
      .object({
        access_token: z.string(),
        token_type: z.literal('bearer'),
        scope: z.string(),
      })
      .parse(githubAccessTokenData)

    return {
      token: githubAccessToken,
    }
  }

  static async getUser(token: string) {
    const githubUserResponse = await fetch(USER_OAUTH_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const githubUserData = await githubUserResponse.json()

    const {
      id,
      name,
      email,
      avatar_url: avatarUrl,
    } = z
      .object({
        id: z.number().int().transform(String),
        avatar_url: z.string().url(),
        name: z.string().nullable(),
        email: z.string().email().nullable(),
      })
      .parse(githubUserData)

    return {
      id,
      name,
      email,
      avatarUrl,
    }
  }
}
