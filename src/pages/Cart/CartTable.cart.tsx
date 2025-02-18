import React from "react";
import { ICartItem, ICartTable } from "../../utils/interface.utils";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartItem } from "../../Models/Cart.model";

const CartTable: React.FC<{
  cartItems: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}> = ({ cartItems, onRemove, onUpdateQuantity }) => {
  return (
    <div className="cart-table font-aeonik">
      {/* Cart Items */}
      {cartItems.map((item: any) => {
        const { product, quantity } = item;

        return (
          <div
            key={product.id}
            className="cart-item d-flex justify-item-center align-items-left grid grid-cols-5 items-center py-2 border border-light-subtle">
            <div className="d-flex flex-column">
              {/* Product Image */}
              <div className="col-span-1 px-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="cart-item-image"
                  style={{ width: "80px", height: "80px" }}
                />
              </div>

              {/* Remove Button */}
              <div
                className="col-span-1 text-left"
                style={{ margin: "40px 0" }}>
                <button
                  onClick={() => onRemove(product.id)}
                  className="btn btn-link text-decoration-none text-dark fw-semibold">
                  Remove <RiDeleteBin6Line size={20} color="yellow" />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-span-2">
              <h5
                className="fw-semibold text-lg text-nowrap"
                style={{ width: "8rem" }}>
                {product.name}
              </h5>
              <p
                className="text-sm text-nowrap"
                style={{ margin: "20px 0", width: "8rem" }}>
                <span className="text-warning">★ ★ ★ ★ ★</span> (150 Reviews) |{" "}
                {product.inStock ? (
                  <span className="text-success">In Stock</span>
                ) : (
                  <span className="text-danger">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Price */}
            <div className="d-flex flex-column justify-content-between align-items-right">
              <div
                className="col-span-1 font-medium"
                style={{ margin: "0 220px" }}>
                NGN {product.price}
              </div>

              {/* Quantity Controls */}
              <div
                className="d-flex align-items-center mb-4"
                style={{ margin: "0 155px" }}>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => onUpdateQuantity(product.id, quantity - 1)} disabled={quantity <= 1}>
                  <FaMinus color={"black"} />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="form-control text-center mx-2 w-25"
                />
                <button
                  className="btn btn-outline-warning"
                  onClick={() => onUpdateQuantity(product.id, quantity + 1)}>
                  <FaPlus color={"black"} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartTable;
