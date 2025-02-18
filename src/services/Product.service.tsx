import axios from "axios"
import { IProduct } from "../utils/interface.utils"

const API_URL = "http://localhost:5000/api" 


export const productService = {
    async getProducts(page: number = 1, limit: number = 12): Promise<any> {
      const response = await axios.get(`${API_URL}/products`, {
        params: { page, limit }
      });
      return response.data
    },
  
    async getFlashSales(page: number = 1, limit: number = 10): Promise<any> {
       const response = await axios.get(`${API_URL}/products/flash-sales`, {
          params: { page, limit }
        }
    );
       return response.data
    },

    async getProductById(id: string): Promise<any> {
      const response = await axios.get(`${API_URL}/products/${id}`)
      return response.data
    },

    async getProductByCategory(category: string): Promise<any> {
        const response = await axios.get(`${API_URL}/products/category/${category}`)
        return response.data
      },
    
    async searchProducts(query: string): Promise<any> {
      const q = `q=${query}&page=1&limit=30`;
        const response = await axios.post(`${API_URL}/products/search?${q}`, {});
        return response.data
      },

      async getCategories() {
        try {
          const response = await axios.get(`${API_URL}/category`);
          return response.data; // Assuming the response contains an array of categories
        } catch (error) {
          console.error("Error fetching categories:", error);
          return [];
        }
      },

        async getSimilarProducts(id: string, limit: number = 5): Promise<any> {
        const response = await axios.get(`${API_URL}/products/${id}/similar`, {
          params: { limit }
        });
        return response.data;
      },
  }