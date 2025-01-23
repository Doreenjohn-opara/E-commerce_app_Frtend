import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className="left-side text-light py-2">
      <div className="container d-flex justify-content-center gap-3 align-items-center font-aeonik">
        <span>
          June Sales For All Apple Products And Free Express Delivery - OFF 50%!
        </span>
        <Link 
            to="/shop"
            className="text-warning me-3" style={{ textDecoration: "none" }}
            >
            ShopNow
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button
              className="btn btn-sm btn-outline-none text-light dropdown-toggle"
              type="button"
              id="languageDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              English
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="languageDropdown">
                <Link to="#" className="dropdown-item">English</Link>
                <Link to="#" className="dropdown-item">English</Link>
                <Link to="#" className="dropdown-item">Spanish</Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
