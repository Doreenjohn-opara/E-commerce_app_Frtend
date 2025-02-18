import { useContext, useEffect, useState } from "react";
import Category from "../../components/Layouts/category";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { IProduct, IWishlist } from "../../utils/interface.utils";
import { productService } from "../../services/Product.service";
import { useProductContext } from "../../Hook/useProduct.hook";
import { useCartContext } from "../../Hook/useCart.hook";
import { useSavedItemActions } from "../../Hook/savedItemAction.hook";
import { Spinner } from "react-bootstrap";
import { CartItem } from "../../Models/Cart.model";
import { NotificationContext } from "../../context/Notification.context";
import { useAuth } from "../../Hook/useAuth.hook";


const SearchProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get("q") || "";

  const { state, fetchProduct, resetCurrentProduct } = useProductContext();
  const { dispatch: cartDispatch } = useCartContext();
  const { showNotification } = useContext(NotificationContext);
  const { toggleSavedItem, isSavedItem } = useSavedItemActions();
  const { state: AuthState  } = useAuth();


  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const results = await productService.searchProducts(searchQuery)
        setProducts(results.data)
      } catch (err) {
        setError("Failed to fetch search results")
      } finally {
        setLoading(false)
      }
    }

    if (searchQuery) {
      fetchSearchResults()
    }
  }, [searchQuery])

  if (loading) {
    return <div className="text-center"><Spinner animation="border"/>Loading...</div>
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>
  }
  
  
  const addToCart = (product: IProduct) => {
    try {
      const cartItem = {
        ...product,
        quantity: 1,
        inStock: product.stock > 0, // Calculate inStock from stock
        user: AuthState.user.id || "guest"  // Replace with actual user ID from your auth context
      };
    cartDispatch({ type: "ADD_TO_CART", payload: cartItem });
    showNotification("Product added to cart", "success");
    navigate("/cart") 
  } catch (error) {
    showNotification("Failed to add product to cart", "error");
  }
};
    

  // Pagination
  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <>
      <div className="container my-4 font-aeonik">
        <div className="row">
          {/* Categories Column */}
          <Category />

          {/* product display */}
          <div className="col-md-9">
            <h2>Search Results for: {searchQuery}</h2>
            {products.length === 0 && <p>No products found.</p>}
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card position-relative">
                  {/* Discount or New Tag */}
                  <div
                    className={`position-absolute top-0 start-0 px-2 py-1 text-white`}
                    style={{
                      fontSize: "0.8rem",
                      borderRadius: "0 0 4px 0",
                      backgroundColor:
                      Math.round(((product.price - product.flashSalePrice) / product.price) * 100) > 0 ? "#FFC107" : "#28A745",
                    }}>
                    {Math.round(((product.price - product.flashSalePrice) / product.price) * 100) > 0 ? `${Math.round(((product.price - product.flashSalePrice) / product.price) * 100)}% OFF` : "New"}
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
                  <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                  <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt={product.name}
                    style={{
                      height: "220px",
                      width: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-2 fw-bold">{product.name}</h5>
                    <p className="card-text">
                      {Math.round(((product.price - product.flashSalePrice) / product.price) * 100) > 0 && (
                        <span className="text-muted text-decoration-line-through">
                          {product.currency}
                          {(
                            product.price *
                            (1 + (Math.round(((product.price - product.flashSalePrice) / product.price) * 100)) / 100)
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
                  </div>
                  </Link>
                  <button
                    className="btn btn-warning"
                    onClick={() => addToCart(product)}
                    >
                      Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;



