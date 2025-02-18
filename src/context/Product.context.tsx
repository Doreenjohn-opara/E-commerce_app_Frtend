import React, { createContext, useReducer, ReactNode } from "react";
import {
  ProductAction,
  ProductContextType,
  ProductState,
} from "../utils/types.utils";
import { productReducer } from "../reducer/Product.reducer";
import { productService } from "../services/Product.service";

const initialState: ProductState = {
  products: [],
  flashSales: [],
  savedItems: [],
  currentProduct: null,
  isLoading: false,
  error: null,
};

export const ProductContext = createContext<{
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  fetchProduct: (id: string) => Promise<void>;
  resetCurrentProduct: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  fetchProduct: () => Promise.resolve(),
  resetCurrentProduct: () => {},
});

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProduct = async (id: string) => {
    dispatch({ type: "FETCH_PRODUCT_START" });
    try {
      const product = await productService.getProductById(id);
      dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: product.data });
    } catch (error) {
      dispatch({
        type: "FETCH_PRODUCT_FAILURE",
        payload: "Failed to fetch product",
      });
    }
  };

  const resetCurrentProduct = () => {
    dispatch({ type: "RESET_PRODUCT" });
  };

  return (
    <ProductContext.Provider
      value={{ state, dispatch, fetchProduct, resetCurrentProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
