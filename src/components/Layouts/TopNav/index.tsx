import React from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaQuestionCircle,
  FaShoppingCart,
  FaUser,
  FaBox,
  FaHeart,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light py-2 font-aeonik">
      <div className="container">
        
        {/* Brand Name */}
        <Link className="navbar-brand fw-bold" to="/">
          KOP MALL
        </Link>

        {/* Search Bar */}
        <form className="d-flex flex-grow-1 mx-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search for products, brands and categories."
            />
            <button className="btn btn-warning text-white" type="submit">
              Search
            </button>
          </div>
        </form>

        {/* Right Side Icons */}
        <ul className="navbar-nav d-flex align-items-center gap-3 mb-0">
          {/* Help */}
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <FaQuestionCircle size={20} /> Help
            </Link>
          </li>

          {/* Cart */}
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <FaShoppingCart size={20} /> Cart
            </Link>
          </li>

          {/* Account Dropdown */}
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="accountDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <FaUser size={20} /> Account
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="accountDropdown">
              <li>
                <Link className="dropdown-item" to="#">
                  <FaBox className="me-2" /> Orders
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  <FaHeart className="me-2" /> Saved Items
                </Link>
              </li>
              <li>
                <button type="submit" className="signup-btn w-100 mt-3">
                  <Link className="dropdown-item" to="/signup">
                    Sign Up
                  </Link>
                </button>
              </li>
              <li>
                <button type="submit" className="signup-btn w-100 mt-3">
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
