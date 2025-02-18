import { createContext, useEffect, useReducer } from "react";
import { CartItem, CartState } from "../Models/Cart.model";
import { CartAction, CartContextType } from "../utils/types.utils";
import cartReducer from "../reducer/Cart.reducer";
import { cartService } from "../services/Cart.service";

const initialState: CartState = {
  items: []
};

export const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
      addToCart: (productId: string, quantity: number) => Promise<void>;
      removeFromCart: (productId: string) => Promise<void>;
      updateQuantity: (productId: string, quantity: number) => Promise<void>;
      clearCart: () => Promise<void>;
    }
  | undefined
>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await cartService.getCart();
        dispatch({ type: 'SET_CART', payload: data.items });  // Sets all cart items in one action
      } catch (error) {
        console.error('Error initializing cart:', error);
      }
    };
    fetchCart();
}, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const updatedCart = await cartService.addToCart({ productId, quantity });
      dispatch({ type: "ADD_TO_CART", payload: updatedCart });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await cartService.removeFromCart(productId);
      dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      // Find the full cart item from state
      const existingItem = state.items.find((item) => item.id === productId);
      if (!existingItem) {
        console.error("Item not found in cart");
        return;
      }
  
      // Send full item data with updated quantity
      const updatedCart = await cartService.updateCartItem({ ...existingItem, productId: existingItem.id, quantity });
  
      dispatch({ type: "UPDATE_QUANTITY", payload: updatedCart });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
