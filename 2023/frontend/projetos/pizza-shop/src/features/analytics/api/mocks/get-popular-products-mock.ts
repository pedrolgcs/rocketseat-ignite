import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', async () => {
  return HttpResponse.json([
    {
      product: 'Mussarela',
      amount: 10,
    },
    {
      product: 'Frango Catupiry',
      amount: 15,
    },
    {
      product: 'Calabresa',
      amount: 60,
    },
    {
      product: '4 queijos',
      amount: 35,
    },
  ])
})
