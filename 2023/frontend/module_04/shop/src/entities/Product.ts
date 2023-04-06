import { priceFormatter } from '@/utils/currency';

type ProductConstructor = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  imagesUrl: String[];
  defaultPriceId: string;
};

export class Product {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly price: number;
  readonly defaultPriceId: string;
  readonly imagesUrl: String[];

  constructor({
    id,
    name,
    description,
    price,
    defaultPriceId,
    imagesUrl,
  }: ProductConstructor) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.defaultPriceId = defaultPriceId;
    this.imagesUrl = imagesUrl;
  }

  get formattedPrice() {
    return priceFormatter.format(this.price / 100);
  }
}
