import { api } from '../api-client'

export type GetBillingParams = {
  slug: string
}

export type GetBillingResponse = {
  billing: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

export async function getBilling(params: GetBillingParams) {
  const { slug } = params

  const result = await api
    .get(`organizations/${slug}/billing`, {
      next: {
        tags: [`${slug}_billing`],
      },
    })
    .json<GetBillingResponse>()

  return result
}
