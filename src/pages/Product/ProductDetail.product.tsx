import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { IProduct, ITab } from "../../utils/interface.utils";
import SimilarItems from "../Cart/SimilarItems.cart";
import { FaMinus, FaPlus } from "react-icons/fa";
import Breadcrumb from "./breadcrumb.product";
import { CiHeart } from "react-icons/ci";
import { useProductContext } from "../../Hook/useProduct.hook";
import { useSavedItemActions } from "../../Hook/savedItemAction.hook";
import { useCartContext } from "../../Hook/useCart.hook";
import { Spinner } from "react-bootstrap";
import { NotificationContext } from "../../context/Notification.context";
import { useAuth } from "../../Hook/useAuth.hook";
import { CartItem } from "../../Models/Cart.model";
import { cartService } from "../../services/Cart.service";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, fetchProduct, resetCurrentProduct } = useProductContext();
  const { isSavedItem, toggleSavedItem } = useSavedItemActions();
  const { dispatch: cartDispatch } = useCartContext();
  const [quantity, setQuantity] = useState<number>(1);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const { state: AuthState } = useAuth();

  useEffect(() => {
    if (!id) {
      showNotification("Invalid product ID", "error");
      navigate("/products");
      return;
    }

    const loadProduct = async () => {
      try {
        await fetchProduct(id);
      } catch (error) {
        showNotification("Failed to load product", "error");
        navigate("/products");
      }
    };

    loadProduct();

    return () => {
      resetCurrentProduct();
    };
  }, [id]);

  const handleQuantityChange = (type: string) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = (product: IProduct) => {
    if (product.stock < 1) {
      showNotification("Product is out of stock", "error");
      return;
    }
    
    if (quantity > product.stock) {
      showNotification(`Only ${product.stock} items available`, "warning");
      return;
    };
    
    try {
      const cartItem: CartItem = {
        ...product,
        quantity,
        inStock: product.stock > 0,
        user: localStorage.getItem('userId') || ''
      };
      cartDispatch({ type: "ADD_TO_CART", payload: cartItem });
      cartService.addToCart({ productId: product.id, quantity })
      showNotification("Product added to cart", "success");
      navigate("/cart") // Navigate to cart after adding the item
    } catch (error) {
      console.error("Error adding product to cart:", error)
      showNotification("Failed to add product to cart", "error");
    }
  };

  if (state.isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        Loading...
      </div>
    );
  }

  if (state.error || !state.currentProduct) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">
          Error: {state.error || "Product not found"}
        </div>
        <button
          className="btn btn-warning"
          onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  const { currentProduct } = state;

  return (
    <div className="container my-5">
      {/* Breadcrumb */}
      {/* <Breadcrumb breadcrumb={currentProduct.breadcrumb} /> */}

      <div className="row">
        {/* Product Images */}
        <div className="col-md-3 border border-ouline-warning">
          <div className="mb-3 mx-4">
            <img
              src={currentProduct.imageUrl}
              className="img-fluid"
              alt="Product"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-7 mx-5">
          {/* Product Title */}
          <h2>{currentProduct.name}</h2>

          {/* Product Rating and Status */}
          <div className="d-flex align-items-center mb-3">
            <span className="me-2">⭐⭐⭐⭐⭐</span>
            <span className="text-muted">(150 Reviews) </span>
            <span className="ms-3 text-success"> | In Stock</span>
          </div>

          {/* Product Price */}
          <p>
            {currentProduct.currency} {currentProduct.price}
          </p>
          <p className="text-muted">{currentProduct.description}</p>

          {/* Quantity and Buy Section */}
          <div className="d-flex align-items-center mb-4">
            <button
              className="btn btn-outline-warning"
              onClick={() => handleQuantityChange("decrement")}>
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
              onClick={() => handleQuantityChange("increment")}>
              <FaPlus color={"black"} />
            </button>
            <button
              className="btn btn-warning ms-3"
              onClick={() => {
                addToCart(currentProduct);
              }}>
              Buy Now!
            </button>
            <button
              className="btn border border-dark-subtle btn-light ms-3"
              onClick={() => toggleSavedItem(currentProduct.id)}>
              {isSavedItem(currentProduct.id) ? (
                <img
                  src="../../../images/favs/heart.png"
                  alt="saved-items"
                  style={{ width: "25px" }}
                />
              ) : (
                <CiHeart size={25} /> // Unsaved icon
              )}
            </button>
          </div>

          {/* Delivery and Return Policies */}
          <div className="border p-3 rounded w-75">
            <div className="d-flex align-items-start mb-3">
              <div className="me-3">🚚</div>
              <div>
                <strong>Free Delivery</strong>
                <p className="mb-0">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <div className="me-3">🔄</div>
              <div>
                <strong>Return Delivery</strong>
                <p className="mb-0">
                  Free 30 Days Delivery Returns. <a href="#">Details</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {currentProduct.tabs && currentProduct.tabs?.length > 0 && (
        <>
          <ul className="nav nav-tabs my-4" id="productTab" role="tablist">
            {currentProduct.tabs.map((tab: ITab, index: number) => (
              <li className="nav-item" role="presentation" key={index}>
                <button
                  className={`nav-link ${index === 0 ? "active" : ""}`}
                  id={`${tab.id}-tab`}
                  data-bs-toggle="tab"
                  data-bs-target={`#${tab.id}`}
                  type="button"
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={index === 0}>
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
          <div className="tab-content my-5" id="productTabContent">
            {currentProduct.tabs.map((tab: ITab, index: number) => (
              <div
                key={index}
                className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                id={tab.id}
                role="tabpanel"
                aria-labelledby={`${tab.id}-tab`}>
                {tab.content}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Similar Items */}
      <SimilarItems id={currentProduct.id} limit={4} />
    </div>
  );
};

export default ProductDetails;
