import axios from "axios";
import { IWishlist } from "../utils/interface.utils"

const API_URL = "http://localhost:5000/api" // Replace with your actual API URL

export const wishlistService = {
    addToWishlist: async (productId: string) => {
        const response = await axios.post(`${API_URL}/wishlist/add`, { userId: "USER_ID", productId });
        return response.data;
    },

  removeFromWishlist: async (productId: string) => {
    const response = await axios.delete(`${API_URL}/wishlist/remove`, {
      params: { userId: "USER_ID", productId }
    });
    return response.data;
  },

  getWishlist: async (userId: string) => {
    const response = await axios.get(`${API_URL}/wishlist`, { 
      params: { userId }
    });
    return response.data;
  },
}