import { z } from 'zod'
import data from '../db.json'

type Params = {
  params: {
    slug: string
  }
}

export async function GET(_: Request, { params }: Params) {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const slug = z.string().parse(params.slug)

  const product = data.products.find((product) => product.slug === slug)

  if (!product) {
    return Response.json(
      {
        message: 'Product not found.',
      },
      { status: 400 },
    )
  }

  return Response.json(product)
}
