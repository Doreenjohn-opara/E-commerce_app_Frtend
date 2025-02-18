import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../Cart/Breadcrumb.cart";
import CartSummary from "../Cart/CartSummary.cart";
import SimilarItems from "../Cart/SimilarItems.cart";
import CartTable from "./CartTable.cart";
import { NotificationContext } from "../../context/Notification.context";
import { useCartContext } from "../../Hook/useCart.hook";
import { cartService } from "../../services/Cart.service";
import { CartItem } from "../../Models/Cart.model";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const { showNotification } = useContext(NotificationContext);
  const { dispatch: cartDispatch, state: { items } } = useCartContext();
  const [showSimilarItems, setShowSimilarItems] = useState(false);
  const navigate = useNavigate();

  // show similar items only once when items are present.
  useEffect(() => {
    if (items.length > 0 && !showSimilarItems) {
      setShowSimilarItems(true);
    }
  }, [items]); 

  const handleRemove = async (id: string) => {
    try {
      await cartService.removeFromCart(id);
      cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
      showNotification("Item removed from cart", "success");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      showNotification("Failed to remove item from cart", "error");
    }
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    const item = items.find((item) => item.id === id);
    if (!item) {
      showNotification("Item not found in cart", "error");
      return;
    }

    const newQuantity = Math.max(quantity, 1);

    if (newQuantity > item.stock) {
      showNotification(`Only ${item.stock} items available`, "warning");
      return;
    }

    try {
      // const cartItem: CartItem = {
      //   ...item,
      //   quantity,
      //   inStock: item.stock > 0,
      //   user: localStorage.getItem('userId') || ''
      // };

      await cartService.updateCartItem({ productId: item.id, quantity: newQuantity });
      cartDispatch({
        type: "UPDATE_QUANTITY",
        payload: { id, quantity: newQuantity },
      });
      showNotification("Quantity updated successfully", "success");
    } catch (error) {
      console.error("Error updating quantity:", error);
      showNotification("Failed to update quantity", "error");
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      showNotification('Your Cart is empty', 'warning');
      return;
    }
    showNotification("Proceeding to checkout...", "success")
    navigate("/checkout")
  }

  const subtotal = items.reduce((sum, item: any ) => sum + item.product.price * item.quantity, 0)


  return (
  <div className="container my-5">
    <div className="row">
      <div className="col-md-7">
        <div className="card">
          <div className="card-body">
             <h3>Cart ({items.length})</h3>
              <CartTable cartItems={items} onRemove={handleRemove} onUpdateQuantity={handleUpdateQuantity} />
          </div>
        </div>
      </div>
      <div className="col-md-5">
          <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
      </div>
    </div>
    {items.slice(0, 4).map((item) => (
  <SimilarItems 
  key={`similar-${item.id}`} 
  id={item.id} 
  limit={4} 
  />
))}
  </div>
  );
};

export default CartPage;
