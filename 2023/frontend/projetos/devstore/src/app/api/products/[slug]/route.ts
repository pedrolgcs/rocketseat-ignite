import { z } from 'zod'
import { RequestError } from '@/data/types/request'
import data from '../db.json'

type Params = {
  params: {
    slug: string
  }
}

export async function GET(_: Request, { params }: Params) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const slug = z.string().parse(params.slug)

  const product = data.products.find((product) => product.slug === slug)

  if (!product) {
    const error: RequestError = {
      message: 'Product not found',
      friendlyMessage: `Não foi possível encontrar o produto ${slug}.`,
    }

    return Response.json(error, { status: 400 })
  }

  return Response.json(product)
}
