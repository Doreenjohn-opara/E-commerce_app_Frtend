export interface Product {
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
  }