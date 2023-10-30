import database from './db.json'

export async function GET() {
  return Response.json({
    products: database.products,
  })
}
