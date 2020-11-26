import { Bag } from './bag';

export interface ShoppingCart {
  $key?: string,
  userId: string,
  bags: Bag[];
}
