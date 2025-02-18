import { ProductAction, ProductState } from "../utils/types.utils";

export const productReducer = (state: ProductState, action: ProductAction): ProductState => {
    switch (action.type) {
      case "FETCH_PRODUCTS_START":
        return { ...state, isLoading: true, error: null }
      case "FETCH_PRODUCTS_SUCCESS":
        return { ...state, isLoading: false, products: action.payload }
      case "FETCH_PRODUCTS_FAILURE":
        return { ...state, isLoading: false, error: action.payload }
      case "FETCH_FLASH_SALES_SUCCESS":
        return { ...state, flashSales: action.payload }
        case "FETCH_PRODUCT_START":
          return { ...state, isLoading: true, error: null }
        case "FETCH_PRODUCT_SUCCESS":
          return { ...state, isLoading: false, currentProduct: action.payload }
        case "FETCH_PRODUCT_FAILURE":
          return { ...state, isLoading: false, error: action.payload }
          case "RESET_PRODUCT":
            return { ...state, currentProduct: null };
        default:
          return state
    }
  }  