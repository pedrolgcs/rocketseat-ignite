import database from '../db.json'

export async function GET() {
  const featuredProducts = database.products.find((product) => product.featured)

  return Response.json({
    products: featuredProducts,
  })
}
