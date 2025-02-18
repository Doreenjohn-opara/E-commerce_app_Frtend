import { useContext } from "react";
import { ProductContext } from "../context/Product.context";

export const useProductContext = () => {
  const { state, dispatch, fetchProduct, resetCurrentProduct } = useContext(ProductContext);
  
  return { state, dispatch, fetchProduct, resetCurrentProduct };
};
