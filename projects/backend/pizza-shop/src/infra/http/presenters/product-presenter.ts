import { Product } from '@/domain/store/enterprise/entities'

export class ProductPresenter {
  static toHTTP(product: Product) {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      priceInCents: product.priceInCents,
    }
  }
}
