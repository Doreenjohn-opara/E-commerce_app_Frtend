import {
    FaGift,
    FaHeart,
    FaAddressBook,
    FaWallet,
    FaSignOutAlt,
    FaUser,
  } from "react-icons/fa";
  import { Link } from "react-router-dom";
  
  const Sidebar = () => {
    return (
      <>
        <div className="col-md-3">
          <div className="list-group">
            <Link
              to="/user/account"
              className="list-group-item list-group-item-action">
              <FaUser className="me-2" />
              My Account
            </Link>
            <Link
              to="/user/orders"
              className="list-group-item list-group-item-action">
              <FaGift className="me-2" />
              Orders
            </Link>
            <Link
              to="/user/saved-items"
              className="list-group-item list-group-item-action">
              <FaHeart className="me-2" />
              Saved items
            </Link>
            <Link
              to="/user/edit-address"
              className="list-group-item list-group-item-action">
              <FaAddressBook className="me-2" />
              Address book
            </Link>
            <Link to="#" className="list-group-item list-group-item-action">
              <FaWallet className="me-2" />
              Wallet
            </Link>
            <Link
              to="/logout"
              className="list-group-item list-group-item-action text-danger">
              <FaSignOutAlt className="me-2" />
              Log out
            </Link>
          </div>
        </div>
      </>
    );
  };
  
  export default Sidebar;
  