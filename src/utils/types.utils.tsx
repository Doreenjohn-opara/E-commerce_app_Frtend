import {
  INotificationProps,
  IProduct,
  SavedItemsState,
} from "./interface.utils";
import { CartItem, CartState } from "../Models/Cart.model";
import { Product } from "../Models/Product.model";

export type AuthState = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: any }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

export type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export type ProductType = IProduct & Product;

export type ProductAction =
  | { type: "FETCH_PRODUCTS_START" }
  | { type: "FETCH_PRODUCTS_SUCCESS"; payload: IProduct[] }
  | { type: "FETCH_PRODUCTS_FAILURE"; payload: string }
  | { type: "FETCH_FLASH_SALES_SUCCESS"; payload: IProduct[] }
  | { type: "FETCH_PRODUCT_START" }
  | { type: "FETCH_PRODUCT_SUCCESS"; payload: IProduct }
  | { type: "FETCH_PRODUCT_FAILURE"; payload: string }
  | { type: "RESET_PRODUCT" };

export type ProductState = {
  products: IProduct[];
  flashSales: IProduct[];
  savedItems: string[];
  isLoading: boolean;
  error: string | null;
  currentProduct: IProduct | null;
};

export type ProductContextType = {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  resetCurrentProduct: () => void;
};

export type CartAction =
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

export type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};

export type SavedItemsAction =
  | { type: "ADD_SAVED_ITEM"; payload: string }
  | { type: "REMOVE_SAVED_ITEM"; payload: string }
  | { type: "SET_SAVED_ITEMS"; payload: string[] };

export type SavedItemContextType = {
  state: SavedItemsState;
  dispatch: React.Dispatch<SavedItemsAction>;
};

export type NotificationType = INotificationProps["type"];

export interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}
