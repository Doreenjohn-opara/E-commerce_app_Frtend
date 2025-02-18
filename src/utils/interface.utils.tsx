import { ChangeEvent, Key } from "react";

export interface IPasswordInput {
    text: string;
    icon?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
    name?: string;
    hasIcon?: boolean;
    transparent?: boolean;
  }

  export interface ITextInput {
    type: 'email' | 'text';
    text: string;
    icon?: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    id?: string;
    name?: string;
    hasIcon?: boolean; 
    transparent?: boolean;
  }

  export interface IButton {
    type?: string;
    text: string;
    onClick?: () => void;
    color?: string; 
}


export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneCode: string;
  phoneNumber: string;
}

export interface INotificationProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

export interface ILoginData{
  email: string;
  password: string;
}

export interface ICartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    inStock: boolean;
}

export interface ICartTable {
  cartItems: ICartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export interface ICartSummary {
  subtotal: number;
  onCheckout: () => void;
}

export interface IBreadcrumb {
  title: string;
  link: string;
}

export interface ITab {
  id: string;
  title: string;
  content: string;
  weight: string;
  color: string;
  brand: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  currency: string,
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  lowStockThreshold: number;
  ratings?: Array<{
      user?: string;
      rating?: number;
      review?: string;
      createdAt?: Date;
    }>;
  isCurrentlyOnFlashSale: () => boolean;
  flashSalePrice: number;
  flashSaleStart?: Date;
  flashSaleEnd?: Date;
  tabs?: Array<ITab>;
}

export interface IWishlist {
  productId: string;
  userId: string;
  items: IProduct[];
}

export interface ICart {
    user: string;
    items: ICartItem[];
  }

export interface SavedItemsState {
  savedItems: string[];
}

