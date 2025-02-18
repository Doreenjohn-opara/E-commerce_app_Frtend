import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { categories } from "./categoryList/CategoryList";

const BrowseCategory = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Number of items to show per slide
  const totalPages = Math.ceil(categories.length / itemsPerPage); 

  // Pagination
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Calculate the categories to display on the current page
  const displayedCategories = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="font-aeonik">
      <div className="today-box">Category</div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <div
            className="flash-sales-title"
            style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px", marginBottom: "30px" }}
          >
            Browse Our Category
          </div>
        </div>

        <div className="pagination">
          <button
            onClick={handlePrevPage}
            className="btn btn-sm category-btn"
            disabled={currentPage === 0}
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNextPage}
            className="btn btn-sm category-btn"
            disabled={currentPage === totalPages - 1}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      
      <div className="row text-center">
        {displayedCategories.map((category, index) => (
          <div key={index} className="col-md-2 col-6 d-flex flex-column align-items-center">
            <div className="category-icon">
              <span>{category.icon}</span>
            </div>
            <p className="mt-1 text-center fw-semibold">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategory;
