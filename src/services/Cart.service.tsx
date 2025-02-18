import axios from "axios";
import { CartItem } from "../Models/Cart.model";

interface AddToCartData {
  productId: string;
  quantity: number;
}

interface UpdateCartItemData {
  productId: string;
  quantity: number;
}

const API_URL = "http://localhost:5000/api/cart";

export const cartService = {
  async getCart(): Promise<any> {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.get(`${API_URL}`, config);
      console.log("CART", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to retrieve cart");
    }
  },

  // Add product to cart
  async addToCart(data: AddToCartData): Promise<any> {
    try {
      const { productId, quantity } = data;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      
      const response = await axios.post(`${API_URL}/add-cart/${productId}`,  { quantity }, config);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add product to cart");
    }
  },

  // Update cart item
  async updateCartItem(data: UpdateCartItemData): Promise<any> {
    try {
      const { productId, quantity } = data;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.put(`${API_URL}/update-cart/${productId}`, { quantity }, config);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update cart item");
    }
  },

  // Remove product from cart
  async removeFromCart(productId: string): Promise<any> {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.delete(`${API_URL}/remove/${productId}`, config);
      return response.data;
    } catch (error) {
      throw new Error("Failed to remove product from cart");
    }
  },

  // Clear cart
  async clearCart(): Promise<any> {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.delete(`${API_URL}/clear`, config);
      return response.data;
    } catch (error) {
      throw new Error("Failed to clear cart");
    }
  },

  // Get cart item count
  async getCartItemCount(): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}/count`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to retrieve cart item count");
    }
  },
};
