import { useState, useEffect } from 'react';
import { productService } from "../services/Product.service";
import { IProduct } from '../utils/interface.utils';

export const useSimilarProducts = (id: string, limit: number = 5) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getSimilarProducts(id, limit);
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch similar products');
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [id, limit]);

  return { products, loading, error };
};