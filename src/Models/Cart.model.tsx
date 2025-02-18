import { IProduct } from "../utils/interface.utils";

export interface CartItem extends IProduct {
  quantity: number;
  inStock: boolean;
  user: string;
}

export interface CartState {
  items: CartItem[];
}
