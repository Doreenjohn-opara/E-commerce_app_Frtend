import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IProduct } from "../../utils/interface.utils";
import { productService } from "../../services/Product.service";
import { cartService } from "../../services/Cart.service";
import { wishlistService } from "../../services/wishlist.service";
import { Spinner } from "react-bootstrap";
import { NotificationContext } from "../../context/Notification.context";
import { useSavedItemActions } from "../../Hook/savedItemAction.hook";
import { CartItem } from "../../Models/Cart.model";
import { useCartContext } from "../../Hook/useCart.hook";

interface ProductApiResponse {
  currentPage: number;
  data: IProduct[]; // Assuming IProduct is correctly defined
  error: boolean;
  message: string;
  totalPages: number;
  totalProducts: number;
}

interface OurProductProps {
  productsProp: IProduct[]
}

const OurProduct: React.FC<OurProductProps> = ({ productsProp }) => {
  const [savedItems, setSavedItems] = useState<string[]>([]); // Track saved items by their IDs
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { dispatch: cartDispatch } = useCartContext();
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showNotification } = useContext(NotificationContext);
  const { toggleSavedItem, isSavedItem } = useSavedItemActions();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response =
          (await productService.getProducts()) as unknown as ProductApiResponse;
        setProducts(response.data);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        showNotification("Failed to load products", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
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
      console.log("Adding to cart:", product) 
      const cartItem: CartItem = {
        ...product,
        quantity,
        inStock: product.stock > 0,
        user: localStorage.getItem('userId') || ''
      };
      console.log("Cart item created:", cartItem) 
      cartDispatch({ type: "ADD_TO_CART", payload: cartItem });
      console.log("Cart item created:", cartItem) 
      showNotification("Product added to cart", "success");
      navigate("/cart") // Navigate to cart after adding the item
    } catch (error) {
      console.error("Error adding product to cart:", error)
      showNotification("Failed to add product to cart", "error");
    }
  };

  const handleViewAllProducts = () => {
    navigate("/products");
  };

  if (loading) return <div className="text-center"><Spinner animation="border" />Loading Products...</div>;
  if (error) return <p className="alert alert-danger">Error: {error}</p>;

  return (
    <>
      <div className="font-aeonik mt-5">
        <div className="today-box">Our Product</div>

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
              Explore Our Products
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-sm"
              style={{
                backgroundColor: "#dedee4",
                color: "#000",
                borderRadius: "20px",
                fontWeight: "bold",
                marginRight: "10px",
              }}>
              <FaArrowLeft />
            </button>
            <span className="mx-2">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-sm"
              style={{
                backgroundColor: "#dedee4",
                color: "#000",
                border: "none",
                fontWeight: "bold",
              }}>
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* product display */}
        <div className="row">
          {loading ? <><Spinner animation="border" size="sm" /> Loading... </> : error ? <p>{error}</p> : products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card position-relative">
                {/* Discount or New Tag */}
                <div
                  className={`position-absolute top-0 start-0 px-2 py-1 text-white`}
                  style={{
                    fontSize: "0.8rem",
                    borderRadius: "0 0 4px 0",
                    backgroundColor:
                      Math.round(
                        ((product.price - product.flashSalePrice) /
                          product.price) *
                          100
                      ) > 0
                        ? "#FFC107"
                        : "#28A745",
                  }}>
                  {Math.round(
                    ((product.price - product.flashSalePrice) / product.price) *
                      100
                  ) > 0
                    ? `${Math.round(
                        ((product.price - product.flashSalePrice) /
                          product.price) *
                          100
                      )}% OFF`
                    : "New"}
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
                <Link to={`/product/${product.id}`} className="text-decoration-none text-dark" style={{ color: "inherit" }}>
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "250px",
                    width: "260px",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{product.name}</h5>
                  <p className="card-text">
                    {Math.round(
                      ((product.price - product.flashSalePrice) /
                        product.price) *
                        100
                    ) > 0 && (
                      <span className="text-muted text-decoration-line-through">
                        {product.currency}
                        {(
                          product.price *
                          (1 +
                            Math.round(
                              ((product.price - product.flashSalePrice) /
                                product.price) *
                                100
                            ) /
                              100)
                        ).toFixed(2)}
                      </span>
                    )}{" "}
                    <span className="fw-bold">
                      {product.currency} {product.price.toFixed(2)}
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
                  <Link
                    to="#"
                    className="btn btn-warning"
                    onClick={() => addToCart(product)}>
                    Add to Cart
                  </Link>
                </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="d-grid gap-2 col-2 mx-auto">
          <button
            className="btn btn-warning text-center text-nowrap px-4 py-2 fs-6 fw-semibold"
            onClick={handleViewAllProducts}
            style={{ backgroundColor: "#FCB349", color: "#000000", height: "50px"}}>
              View All Products
          </button>
        </div>
      </div>
    </>
  );
};

export default OurProduct;
