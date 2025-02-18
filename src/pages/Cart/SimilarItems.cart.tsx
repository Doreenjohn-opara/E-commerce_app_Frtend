import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSimilarProducts } from "../../Hook/useSimilarProduct.hook";
import { useSavedItemActions } from "../../Hook/savedItemAction.hook";

interface Props {
  id: string;
  limit?: number;
}

const SimilarItems: React.FC<Props> = ({ id, limit = 4 }) => {
  const { products, loading, error } = useSimilarProducts(id, limit);
  const { toggleSavedItem, isSavedItem } = useSavedItemActions();

  if (loading) {
    return <p>Loading products...</p>
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>
  }

    return (
      <div className="font-aeonik mt-5">
        <div className="today-box">Pick For you</div>
        <div
            className="flash-sales-title mb-3"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginRight: "20px",
            }}>
            Similar Items you might like
          </div>
        <div className="row">
        {products.map((product, index) => (
          <div key={`${product.id}-${index}`} className="col-md-3 mb-4">
            <div className="card position-relative">
              {/* Discount Tag */}
              <div
                className="position-absolute top-0 start-0 text-white px-2 py-1"
                style={{ 
                  fontSize: "0.8rem", 
                  margin: "5px 5px",
                  borderRadius: "0 0 4px 0",
                  backgroundColor: Math.round(((product.price - product.flashSalePrice) / product.price) * 100) > 0 ? "#FFC107" : "#28A745",
                }}
                >
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
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
                style={{ height: "250px", width: "260px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">{product.name}</h5>
                <p className="card-text">
                  <span className="text-muted text-decoration-line-through">
                  {product.currency} {(product.price * (1 + (Math.round(((product.price - product.flashSalePrice) / product.price) * 100)) / 100)).toFixed(2)}
                  </span>{" "}
                  <span className="fw-bold">{product.currency} {product.price.toFixed(2)}</span>
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

                <Link to="#" className="btn btn-warning">
                  Add to Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    );
  };
  
  export default SimilarItems;
  