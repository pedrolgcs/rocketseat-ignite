import { priceFormatter } from '@/utils/currency';

export type TransactionType = 'income' | 'outcome';

export type ITransaction = {
  id: string;
  description: string;
  type: TransactionType;
  category: string;
  price: number;
  createdAt: string;
};

export class Transaction {
  readonly id: string;
  readonly description: string;
  readonly type: TransactionType;
  readonly category: string;
  readonly price: number;
  readonly createdAt: Date;

  constructor({
    id,
    description,
    type,
    category,
    price,
    createdAt,
  }: ITransaction) {
    this.id = id;
    this.description = description;
    this.type = type;
    this.category = category;
    this.price = price;
    this.createdAt = new Date(createdAt);
  }

  get formattedPrice() {
    return priceFormatter.format(this.price);
  }
}
