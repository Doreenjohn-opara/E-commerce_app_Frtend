import { useContext } from "react";
import { CartContext } from "../context/Cart.context";

export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }

    const { state, dispatch, addToCart, removeFromCart, updateQuantity, clearCart } = context;

    return { state, dispatch, addToCart, removeFromCart, updateQuantity, clearCart };
};
