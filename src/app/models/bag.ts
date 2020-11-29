import { CartProduct } from './cart-product';

export interface Bag {
  key?: string,
  price:number,
  products: CartProduct[],
  userId: string,
  weight: number,
  open: boolean,
  items: number,
} 
