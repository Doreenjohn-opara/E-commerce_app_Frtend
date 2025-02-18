import { CartState } from "../Models/Cart.model";
import { CartAction } from "../utils/types.utils";

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, items: action.payload };
    case "ADD_TO_CART":
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id)
      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        }
        console.log("Updated cart items:", updatedItems) // Log the updated items
        return { ...state, items: updatedItems }
      } else {
        // New item, add to cart
        return { ...state, items: [...state.items, action.payload] }
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

export default cartReducer;
