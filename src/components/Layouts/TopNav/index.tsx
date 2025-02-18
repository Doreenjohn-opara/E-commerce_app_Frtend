import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaQuestionCircle,
  FaShoppingCart,
  FaUser,
  FaBox,
  FaHeart,
} from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { TbSquareArrowUpFilled } from "react-icons/tb";
import { useCartContext } from "../../../Hook/useCart.hook";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { state } = useCartContext();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light py-2 font-aeonik">
      <div className="container">
        
        {/* Brand Name */}
        <Link className="navbar-brand fw-bold" to="/">
          KOP MALL
        </Link>

        {/* Search Bar */}
        <form className="d-flex flex-grow-1 mx-3" onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search for products, brands and categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-warning text-white" type="submit">
              Search
            </button>
          </div>
        </form>

        {/* Right Side Icons */}
        <ul className="navbar-nav d-flex align-items-left gap-3 mb-0">
          {/* Help */}
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="accountDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <FaQuestionCircle size={20} /> Help
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="accountDropdown">
              <li>
                <Link className="dropdown-item" to="#">
                   Help Center
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Place an Order
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                   Track an Order
                </Link>
              </li>
              <li>
                  <Link 
                  className="dropdown-item" 
                  to="#"
                  >
                    Cancel an Order
                  </Link>
              </li>
              <li>
                  <Link className="dropdown-item" to="#">
                   Returns & Refunds
                  </Link>
              </li>
            </ul>
          </li>

          {/* Cart */}
          <li className="nav-item position-relative">
            <Link className="nav-link" to="/cart">
              <FaShoppingCart size={20} /> Cart
              {itemCount > 0 && (
              <span className="position-absolute top-10 start-25 translate-middle badge rounded-pill bg-danger">
                {itemCount}
              </span>
              )}
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
                <Link className="dropdown-item" to="/user/account">
                  <FaUser className="me-2" /> My Account
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/user/orders">
                  <FaBox className="me-2" /> Orders
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/user/saved-items">
                  <FaHeart className="me-2" /> Saved Items
                </Link>
              </li>
              <li>
                  <Link 
                  className="dropdown-item" 
                  to="/signup"
                  >
                    <TbSquareArrowUpFilled className="me-2" /> Sign Up
                  </Link>
                
              </li>
              <li>
                  <Link className="dropdown-item" to="/login">
                  <IoLogIn className="me-2" /> Login
                  </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
