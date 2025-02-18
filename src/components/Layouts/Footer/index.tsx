import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { ImLinkedin2 } from "react-icons/im";


const Footer = () => {
  return (
    <footer className="left-side text-light pt-4 font-aeonik">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>KOP MALL</h5>
            <p>Get 10% off your first order</p>
            <div className="input-group">
              <input type="email" className="form-control text-black bg-transparent" placeholder="Enter your email" />
              <button className="btn btn-warning" type="button">Subscribe</button>
            </div>
          </div>
          <div className="col-md-3">
            <h5>Support</h5>
            <p>This is a placeholder for the office address</p>
            <p>kopmall@mail.com</p>
            <p>+234 ------------</p>
          </div>
          <div className="col-md-2">
            <h5>Account</h5>
            <ul className="list-unstyled text-decoration-none">
              <li><a href="/my-account" className="text-light text-decoration-none">My Account</a></li>
              <li><a href="/login" className="text-light text-decoration-none">Login / Register</a></li>
              <li><a href="/cart" className="text-light text-decoration-none">Cart</a></li>
              <li><a href="/wishlist" className="text-light text-decoration-none">Wishlist</a></li>
              <li><a href="/shop" className="text-light text-decoration-none">Shop</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h5>Quick Link</h5>
            <ul className="list-unstyled">
              <li><a href="/privacy" className="text-light text-decoration-none">Privacy Policy</a></li>
              <li><a href="/terms" className="text-light text-decoration-none">Terms Of Use</a></li>
              <li><a href="/faq" className="text-light text-decoration-none">FAQ</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h5>Social Media</h5>
            <p>Connect with us</p>
            <ul className="d-flex justify-content-start list-unstyled">
              <li className="px-2"><Link to="#"><FaInstagram color={"white"}size={18}/></Link></li>
              <li className="px-2"><Link to="#"><FiFacebook color={"white"}size={20}/></Link></li>
              <li className="px-2"><Link to="#"><FaXTwitter color={"white"}size={18}/></Link></li>
              <li className="px-2"><Link to="#"><ImLinkedin2 color={"white"}size={18}/></Link></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <hr/>
        <div className="text-center mt-4">
          <p>© Copyright KOP Mall 2024. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
