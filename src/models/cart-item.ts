import { Product } from '@/models/product';

// eslint-disable-next-line import/prefer-default-export
export class CartItem {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public product: Product,
    public amount: number,
  ) {
  }
}
