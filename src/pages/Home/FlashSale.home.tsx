import React, { useState, useEffect, Fragment, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { productService } from "../../services/Product.service";
import { wishlistService } from "../../services/wishlist.service";
import { IProduct } from "../../utils/interface.utils";
import Spinner from "react-bootstrap/Spinner";
import { Product } from "../../Models/Product.model";
import { NotificationContext } from "../../context/Notification.context";
import { useSavedItemActions } from "../../Hook/savedItemAction.hook";
import { useCartContext } from "../../Hook/useCart.hook";
import { CartItem } from "../../Models/Cart.model";

interface FlashSalesProps {
  products: Product[];
}

const FlashSales: React.FC<FlashSalesProps> = ({ products }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedItems, setSavedItems] = useState<string[]>([]); // Track saved items by their IDs
  const [currentPage, setCurrentPage] = useState(1);
  const [flashSales, setFlashSales] = useState<Array<Product>>([]);
  const { showNotification } = useContext(NotificationContext);
  const { dispatch: cartDispatch } = useCartContext();
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toggleSavedItem, isSavedItem } = useSavedItemActions();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashSales = async () => {
      setLoading(true);
      try {
        const response = await productService.getFlashSales(currentPage, 8);
        setFlashSales(response.data);
        setError("");
      } catch (err) {
        setError("Failed to load flash sales");
        showNotification("Failed to load flash sales", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchFlashSales();
  }, [currentPage]);

  function calculateTimeLeft() {
    const targetDate = new Date().setHours(23, 59, 59); // Today's midnight
    const now: any = new Date();
    const difference = targetDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clear timer on component unmount
  }, []);

  // Adding products to cart
  const addToCart = (product: Product) => {
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
      showNotification("Product added to cart", "success");
      // navigate("/cart") // Navigate to cart after adding the item
    } catch (error) {
      console.error("Error adding product to cart:", error)
      showNotification("Failed to add product to cart", "error");
    }
  };

  // pagination
  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashSales.length);
  };

  const prevProduct = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashSales.length) % flashSales.length
    );
  };

  return (
    <>
      <div className="font-aeonik">
        <div className="today-box">Today's</div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <div
              className="flash-sales-title"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginRight: "20px",
              }}>
              Flash Sales
            </div>

            <div className="mx-5"></div>

            {/* Countdown Timer */}
            <div className="d-flex align-items-center timer">
              <div className="text-center mx-1">
                <p style={{ margin: 0, fontSize: "12px" }}>Days</p>
                <h5 className="fw-bold fs-3">{timeLeft.days}</h5>
              </div>
              <span className="separator fs-3 fw-bold text-warning mx-2">
                :
              </span>
              <div className="text-center mx-1">
                <p style={{ margin: 0, fontSize: "12px" }}>Hours</p>
                <h5 className="fw-bold fs-3">{timeLeft.hours}</h5>
              </div>
              <span className="separator fs-3 fw-bold text-warning mx-2">
                :
              </span>
              <div className="text-center mx-1">
                <p style={{ margin: 0, fontSize: "12px" }}>Minutes</p>
                <h5 className="fw-bold fs-3">{timeLeft.minutes}</h5>
              </div>
              <span className="separator fs-3 fw-bold text-warning mx-2">
                :
              </span>
              <div className="text-center mx-1">
                <p style={{ margin: 0, fontSize: "12px" }}>Seconds</p>
                <h5 className="fs-3">{timeLeft.seconds}</h5>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="btn btn-sm"
              disabled={currentPage === 1}
              style={{
                backgroundColor: "#240C41",
                color: "#ffffff",
                borderRadius: "20px",
                fontWeight: "bold",
                marginRight: "10px",
              }}>
              <FaArrowLeft />
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="btn btn-sm"
              disabled={flashSales.length < 8}
              style={{
                backgroundColor: "#240C41",
                color: "#ffffff",
                border: "none",
                fontWeight: "bold",
              }}>
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Flash sales product display */}
        <div className="row">
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Loading...{" "}
            </>
          ) : error ? (
            <p>{error}</p>
          ) : (
            flashSales.map((product: Product) => (
              <Fragment key={product.id}>
                <div key={product.id} className="col-md-3 mb-4">
                  <div className="card position-relative">
                    {/* Discount Tag */}
                    <div
                      className="position-absolute top-0 start-0 bg-warning text-white px-2 py-1"
                      style={{ fontSize: "0.8rem", borderRadius: "0 0 4px 0" }}>
                      {Math.round(
                        ((product.price - product.flashSalePrice) /
                          product.price) *
                          100
                      )}
                      % OFF
                    </div>

                    {/* Saved Item Toggle */}
                    <div
                      className="position-absolute top-0 end-0 p-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleSavedItem(product.id)}>
                      {isSavedItem(product.id) ? (
                        <img
                          src="../../../images/favs/heart.png"
                          alt="saved-items"
                          style={{ width: "20px" }}
                        /> // Saved icon
                      ) : (
                        <CiHeart size={25} /> // Unsaved icon
                      )}
                    </div>

                    {/* Product Card */}
                    <Link
                      to={`/product/${product.id}`}
                      className="text-decoration-none text-dark"
                      style={{ color: "inherit" }}>
                      <img
                        src={product.imageUrl}
                        className="card-img-top"
                        alt={product.name}
                        style={{
                          height: "250px",
                          width: "260px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{product.name}</h5>
                        <p className="card-text">
                          <span className="text-muted text-decoration-line-through">
                            {product.currency} {product.price}
                          </span>{" "}
                          <span className="fw-bold">
                            {product.currency} {product.flashSalePrice}
                          </span>
                        </p>

                        {/* Rating Section */}
                        <div className="rating d-flex justify-content-start align-items-left mb-3">
                          {/* Star Icons */}
                          <span
                            className="star-icons"
                            style={{ color: "#FFD700", marginRight: "5px" }}>
                            ★★★★☆
                          </span>
                          {/* Number in Brackets */}
                          <span
                            className="rating-number"
                            style={{ fontSize: "14px", color: "#666" }}>
                            (80)
                          </span>
                        </div>
                        <button 
                        className="btn btn-warning"
                        onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </Fragment>
            ))
          )}
        </div>

        {/* View All Products Button */}
        <div className="d-grid gap-2 col-2 mx-auto">
          <button
            className="btn btn-warning text-center px-4 py-2"
            style={{ backgroundColor: "#FCB349", color: "#000000" }}>
            <Link
              to="#"
              className="fs-5 text-decoration-none"
              style={{ color: "#000000" }}>
              View all products
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default FlashSales;
